document.addEventListener('DOMContentLoaded', function() {
  var buttonContainer = document.getElementById('buttonContainer');
  // Update settings link
  var settingsLink = document.getElementById('settingsLink');
  settingsLink.href = window.location.href.replace("popup", "options");

  // Load button configurations on page load
  chrome.storage.sync.get(['buttonConfigs'], function(result) {
    var buttonConfigs = result.buttonConfigs || [];
    renderButtons(buttonConfigs);
  });

  // Render buttons based on configurations
  function renderButtons(buttonConfigs) {
    buttonConfigs.forEach(function(config) {
      var button = createButton(config.label, config.color);
      buttonContainer.appendChild(button);
    });
  }

  // Create a button with the specified label and color
  function createButton(label, color) {
    var button = document.createElement('button');
    button.textContent = label || 'Button';
    button.style.backgroundColor = color || '#3498db';
    button.classList.add('dynamic-button'); // Add a new class for dynamic buttons

    button.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'buttonClicked', label: label, tabId: activeTab.id });
      });
    });

    return button;
  }
});