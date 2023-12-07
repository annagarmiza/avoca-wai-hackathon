let initialExecuted = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("https://www.zara.com/ca/en/search")) {
    chrome.tabs.sendMessage(
      tabId,
      { msg: "productSearch" },
      function (response) {}
    );
  } else if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://www.zara.com/ca/")
  ) {
    // Checking if the tab status has changed to complete
    // Check if the logic has been executed before

    if (!initialExecuted) {
      // Perform the actions or logic when the tab update is complete

      chrome.notifications.create({
        type: "basic",
        title: "Attention!",
        message: "Zara isn't ethical fashion, For details open the extension.",
        iconUrl: "assets/sus32r.png", // Add the path to your notification icon
      });

      chrome.action.setIcon({
        path: {
          16: "assets/sus16r.png",
          48: "assets/sus48r.png",
          128: "assets/sus128r.png",
        },
      });

      chrome.tabs.sendMessage(
        tabId,
        { msg: "openSidebarOnMatchedURL" },
        function (response) {}
      );

      initialExecuted = true;
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Check for the message action
  if (message.action === "openProductSuggestionPage") {
    chrome.action.setPopup({ popup: "productSuggestion.html" });
  }
});
