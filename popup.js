chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'getVariable' }, function (
    response,
  ) {
    document.getElementById('content').textContent = JSON.stringify(
      response?.variable || { x: 'nuull' },
      null,
      2,
    )
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getVariable') {
    sendResponse({ variable: window.__x__ })
  }
})
