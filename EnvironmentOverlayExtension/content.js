var overlayDiv = null;
var buttonConfigs = [];

// Fetch button configurations from storage on page load
chrome.storage.sync.get(['buttonConfigs'], function (result) {
  buttonConfigs = result.buttonConfigs || [];
});

// Listen for messages from the extension
chrome.runtime.onMessage.addListener(async function (request) {
  console.log(request);

  // Handle button click action
  if (request.action === 'buttonClicked') {
    var clickedButtonLabel = request.label;
    var overlayColor = await getOverlayColor(clickedButtonLabel);
    setOverlayColor(overlayColor);
  } else if (request.action === 'updateButtonConfigs') {
    // Handle button configurations update
    console.log("updating button configs");
    buttonConfigs = request.buttonConfigs;
  }
});

// Add alpha channel to a color
function addAlpha(color, opacity) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}

// Get overlay color based on button label
async function getOverlayColor(buttonLabel) {
  var config = buttonConfigs.find(config => config.label === buttonLabel);
  console.log("getting overlay color", config);

  if (!config) {
    console.log("no config found for option");

    // Wrap the asynchronous operation in a Promise
    config = await new Promise(resolve => {
      chrome.storage.sync.get(['buttonConfigs'], function (result) {
        buttonConfigs = result.buttonConfigs || [];
        resolve(buttonConfigs.find(config => config.label === buttonLabel));
      });
    });

    console.log("config after refetch", config);
  }

  return config ? addAlpha(config.color, 0.25) : null;
}

// Set overlay color on the page
function setOverlayColor(color) {
  if (!overlayDiv) {
    // Create overlay div if it doesn't exist
    overlayDiv = document.createElement('div');
    overlayDiv.style.position = 'fixed';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.width = '100%';
    overlayDiv.style.height = '100%';
    overlayDiv.style.zIndex = '9999';
    overlayDiv.style.pointerEvents = 'none';
    document.body.appendChild(overlayDiv);
    overlayDiv.style.backgroundColor = color;
  } else {
    // Remove overlay div if it exists
    if (overlayDiv) {
      overlayDiv.remove();
      overlayDiv = null;
    }
  }
}
