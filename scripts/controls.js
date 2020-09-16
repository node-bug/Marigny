var logger
var isRecording = false
chrome.browserAction.onClicked.addListener(record)

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (isRecording && changeInfo.status === 'complete') {
        logger.logEvent(tab)
    }
})

chrome.tabs.onActivated.addListener(function () {
    if (isRecording) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs[0].status === 'complete') {
                logger.logEvent(tabs[0])
            }
        })
    }
})

chrome.runtime.onMessage.addListener(function (event) {
    if (isRecording) {
        logger.logEvent(event)
    }
})

function record() {
    isRecording = !isRecording
    chrome.storage.local.set({ isRecording: isRecording })
    if (!isRecording) {
        chrome.browserAction.setIcon({
            path: "img/reddot.png"
        })
        logger.clean()
        console.log('stopped')
        console.log(logger)
        saveActivity()
    } else {
        logger = new Logger()
        console.log('started')
        chrome.browserAction.setIcon({
            path: "img/redcircle.png"
        })
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            logger.logEvent(tabs[0])
        })
    }
}

function saveActivity() {
    var file = new Blob([JSON.stringify(logger.log, null, 4)], {
        type: 'application/octet-stream'
    })
    var a = document.createElement('a')
    a.href = URL.createObjectURL(file)
    a.download = 'activity'
    a.click()
}