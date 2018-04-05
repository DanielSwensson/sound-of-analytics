var analyticsCount = 0;

function sendMusicMessage(avgCharCode) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id, {
        analyticsCount: analyticsCount,
        avgCharCode: avgCharCode,
      },
      null
    );
  });
}

chrome.webRequest.onBeforeRequest.addListener(
  function (request) {
    const url = request.url
    var charSum = 0;
    for(var i = 0; i < url.length; i++) {
      charSum += url.charCodeAt(i);
    }
    analyticsCount++;
    sendMusicMessage(charSum / url.length);
  },
  {urls: ["*://*.google-analytics.com/*"]}
)
