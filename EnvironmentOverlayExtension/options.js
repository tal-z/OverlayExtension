document.addEventListener('DOMContentLoaded', function() {
  // Elements
  var buttonConfigsContainer = document.getElementById('buttonConfigs');
  var addButton = document.getElementById('addButton');
  var saveSettingsButton = document.getElementById('saveSettings');

  // Load saved settings on page load
  chrome.storage.sync.get(['buttonConfigs'], function(result) {
    var buttonConfigs = result.buttonConfigs || [];
    renderButtonConfigs(buttonConfigs);
  });

  // Event listeners
  addButton.addEventListener('click', function() {
    addButtonConfig();
  });

  // Save settings when the "Save Settings" button is clicked
  saveSettingsButton.addEventListener('click', function() {
    var buttonConfigs = getButtonConfigs();
    chrome.storage.sync.set({ buttonConfigs: buttonConfigs }, function() {
    });
  });

  // Render existing button configurations
  function renderButtonConfigs(buttonConfigs) {
    buttonConfigs.forEach(function(config, index) {
      addButtonConfig(config.label, config.color);
    });
  }

  // Add a new button configuration
  function addButtonConfig(label = '', color = '#3498db') {
    var buttonConfigDiv = document.createElement('div');
    buttonConfigDiv.classList.add('button-config-item');

    // Input elements
    var labelInput = createInput('text', 'Button Label', label, 'button-label');
    var colorInput = createInput('color', '', color);

    // Remove button
    var removeButton = createRemoveButton(function() {
      buttonConfigDiv.remove();
    });

    // Append elements
    buttonConfigDiv.appendChild(labelInput);
    buttonConfigDiv.appendChild(colorInput);
    buttonConfigDiv.appendChild(removeButton);

    buttonConfigsContainer.appendChild(buttonConfigDiv);
  }

  // Get the current button configurations
  function getButtonConfigs() {
    var buttonConfigs = [];
    var buttonConfigDivs = document.querySelectorAll('.button-config-item');

    buttonConfigDivs.forEach(function(div) {
      var labelInput = div.querySelector('.button-label');
      var colorInput = div.querySelector('input[type="color"]');

      var label = labelInput.value.trim();
      var color = colorInput.value;

      if (label !== '') {
        buttonConfigs.push({ label: label, color: color });
      }
    });

    return buttonConfigs;
  }

  // Utility function to create input elements
  function createInput(type, placeholder, value, className) {
    var input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    if (className) input.classList.add(className);
    return input;
  }

  // Utility function to create remove button
  function createRemoveButton(callback) {
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', callback);
    return removeButton;
  }
});
