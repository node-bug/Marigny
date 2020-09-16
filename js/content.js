var isRecording = false
chrome.storage.local.get([`isRecording`], result => {
    isRecording = result.isRecording
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.isRecording !== undefined && namespace == 'local') {
        isRecording = changes.isRecording.newValue
    };
})

addEventListeners(window)
frames = document.getElementsByTagName('iframe');
for (let frame of frames) {
    frame.addEventListener('load', () => {
        addEventListeners(frame.contentWindow.document)
    }, false)
    frame.addEventListener('mouseover', event => {
        chrome.extension.sendMessage({
            class: "frame",
            event: "activate",
            id: event.target.id || null,
            name: event.target.name || null,
            timestamp: event.timeStamp
        })
    }, false)
    frame.addEventListener('mouseout', event => {
        chrome.extension.sendMessage({
            class: "frame",
            event: "exit",
            id: event.target.id || null,
            name: event.target.name || null,
            timestamp: event.timeStamp
        });
    }, false)
}

function addEventListeners(object) {
    object.addEventListener('mouseover', e => {
        if (isRecording) {
            let srcElement = e.srcElement
            srcElement.style.outline = '3px solid #e9af6e'
            object.addEventListener('mouseout', function () {
                srcElement.style.outline = 'none'
            }, false)
        }
    }, false);

    ['mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu'].forEach(function (type) {
        object.addEventListener(type, event => {
            if (isRecording) {
                chrome.extension.sendMessage({
                    class: "mouse",
                    event: event.type,
                    timestamp: event.timeStamp,
                    button: event.button,
                    clientX: event.clientX,
                    clientY: event.clientY,
                    id: event.target.id || null,
                    tag: event.target.tagName,
                    className: event.target.className || null,
                    textContent: event.target.textContent || null
                })
            }
        }, false)
    })

    object.addEventListener('change', event => {
        if (isRecording) {
            chrome.extension.sendMessage({
                class: "change",
                data: event.data || null,
                event: event.type,
                timestamp: event.timeStamp,
                checked: event.target.checked, // || null,
                className: event.target.className || null,
                id: event.target.id || null,
                name: event.target.name || null,
                tag: event.target.tagName,
                textContent: event.target.textContent || null,
                type: event.target.type || null,
                value: event.target.value || null,
            })
        }
    }, false)

    object.addEventListener('keydown', event => {
        if (isRecording) {
            chrome.extension.sendMessage({
                class: "keyboard",
                key: event.key || null,
                event: event.type,
                timestamp: event.timeStamp,
                className: event.target.className || null,
                id: event.target.id || null,
                name: event.target.name || null,
                tag: event.target.tagName,
                textContent: event.target.textContent || null,
                type: event.target.type || null,
                value: event.target.value || null,
            })
        }
    }, false)

}

