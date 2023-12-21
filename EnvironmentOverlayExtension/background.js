chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "getTabId") {
            // Get the tab ID from the sender tab
            var tabId = sender.tab.id;
            
            // Send the tab ID back to the content script
            sendResponse({ tabId: tabId });
        }
    }
);