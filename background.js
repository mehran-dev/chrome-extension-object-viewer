chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getVariable,
  })
})

function getVariable() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getVariable' }, function (
      response,
    ) {
      chrome.action.setPopup({ tabId: tab.id, popup: 'popup.html' })
      chrome.runtime.sendMessage({ variable: response.variable })
    })
  })
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getVariable') {
    sendResponse({ variable: window.__x__ })
  }
})
