let enabledTabs = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs.length) return;
    const tab = tabs[0];
    const tabId = tab.id;

    if (message.action === "enable") {
      chrome.tabs.insertCSS(tabId, { file: "styles.css" }, () => {
        enabledTabs[tabId] = true;
        sendResponse({ success: true });
      });
    } else if (message.action === "disable") {
      chrome.tabs.removeCSS(tabId, { file: "styles.css" }, () => {
        enabledTabs[tabId] = false;
        sendResponse({ success: true });
      });
    } else if (message.action === "getState") {
      sendResponse({ enabled: enabledTabs[tabId] || false });
    }
  });

  return true;
});
