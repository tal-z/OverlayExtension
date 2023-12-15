document.addEventListener('DOMContentLoaded', function() {
  var buttonConfigsContainer = document.getElementById('buttonConfigs');
  var addButton = document.getElementById('addButton');
  var saveSettingsButton = document.getElementById('saveSettings');

  // Load saved settings on page load
  chrome.storage.sync.get(['buttonConfigs'], function(result) {
    var buttonConfigs = result.buttonConfigs || [];
    renderButtonConfigs(buttonConfigs);
  });

  // Add new button configuration when "Add Button" is clicked
  addButton.addEventListener('click', function() {
    addButtonConfig();
  });

  // Save settings when the "Save Settings" button is clicked
  saveSettingsButton.addEventListener('click', function() {
    var buttonConfigs = getButtonConfigs();
    chrome.storage.sync.set({ buttonConfigs: buttonConfigs }, function() {
      console.log('Settings saved:', { buttonConfigs: buttonConfigs });
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
    buttonConfigDiv.classList.add('button-config-item'); // Use the new class for styling

    var labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = 'Button Label';
    labelInput.value = label;
    labelInput.classList.add('button-label');

    var colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = color;

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      buttonConfigDiv.remove();
    });

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
});
