var analyticsCount = 0;
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { analyticsCount:  ++analyticsCount }, null);
    });
  },
  {urls: ["*://*.google-analytics.com/*"]}
)
