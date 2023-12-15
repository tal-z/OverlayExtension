var overlayActive = false;
var overlayDiv = null;
// Fetch button configurations from storage on page load
var buttonConfigs = [];
chrome.storage.sync.get(['buttonConfigs'], function (result) {
  buttonConfigs = result.buttonConfigs || [];
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'buttonClicked') {

    var clickedButtonLabel = request.label;
    var overlayColor = getOverlayColor(clickedButtonLabel);
    setOverlayColor(overlayColor);
  }

});

function addAlpha(color, opacity) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}


function getOverlayColor(buttonLabel) {
  // Find the configured color for the specified button label
  var config = buttonConfigs.find(config => config.label === buttonLabel);
  return config ? addAlpha(config.color, .25) : null;
}

function setOverlayColor(color) {
    if (!overlayDiv) {
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
      if (overlayDiv) {
        overlayDiv.remove();
        overlayDiv = null;
      }
    }
  };
