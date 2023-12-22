var overlayDiv = null;
var buttonConfigs = [];
var tabId = null;

// Get tabId from background script
async function getTabId() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getTabId" }, function(response) {
      resolve(response.tabId);
    });
  });
}

// Check browser storage for initial tab state
(async () => {
  tabId = await getTabId();
  chrome.storage.sync.get({ [tabId]: null }, function(result) {
    if (result[tabId] !== null) {
      setOverlayColor(result[tabId]);
    }
  });
})();

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(async function (request) {
  // Handle button click action
  if (request.action === 'buttonClicked') {
    var clickedButtonLabel = request.label;
    var overlayColor = await getOverlayColor(clickedButtonLabel);
    setOverlayColor(overlayColor);
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
  config = await new Promise(resolve => {
    chrome.storage.sync.get(['buttonConfigs'], function (result) {
      buttonConfigs = result.buttonConfigs || [];
      resolve(buttonConfigs.find(config => config.label === buttonLabel));
    });
  });
  let alphaColor = config ? addAlpha(config.color, 0.25) : null;  
  return alphaColor;
}

// Set overlay color on the page
async function setOverlayColor(color) {
  currentColor = await new Promise(resolve => {
    chrome.storage.sync.get({ [tabId]: null }, function(storedColor) {
      resolve(storedColor[tabId]);
    });
  })


  if (!overlayDiv || currentColor !== color) {
    chrome.storage.sync.set({ [tabId]: color });
    // If overlayDiv doesn't exist or the color is different
    if (overlayDiv) {
      // Remove the existing overlay
      overlayDiv.remove();
      overlayDiv = null;
    }

    // Create a new overlay with the specified color
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
    // The color matches the current color, so remove the overlay
    chrome.storage.sync.set({ [tabId]: null });
    overlayDiv.remove();
    overlayDiv = null;
  }
};
