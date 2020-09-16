function Logger() {
    this.log = [];
}

Logger.prototype.logEvent = function (event) {
    this.log.push(event);
}

Logger.prototype.clean = function () {
    // mouse event cleaner
    const logSet = new Set(this.log)
    logSet.forEach((event) => {
        if (event.event === 'dblclick') {
            logSet.forEach((item) => {
                if (item.clientX === event.clientX
                    && item.clientY === event.clientY
                    && item.button === event.button
                    // && item.className === event.className
                    // && item.id === event.id
                    // && item.tag === event.tag
                    // && item.textContent === event.textContent
                    && ['mouseup', 'mousedown', 'click'].includes(item.event)) {
                    logSet.delete(item)
                }
            })
        }
        if (event.event === 'click') {
            logSet.forEach((item) => {
                if (item.clientX === event.clientX
                    && item.clientY === event.clientY
                    && item.button === event.button
                    // && item.className === event.className
                    // && item.id === event.id
                    // && item.tag === event.tag
                    // && item.textContent === event.textContent
                    && ['mouseup', 'mousedown'].includes(item.event)) {
                    logSet.delete(item)
                }
            })
        }
    })
    this.log = [...logSet]

    //keyboard event consolidation
    this.log.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));
    for (let i = 0; i < this.log.length; i++) {
        let exit = false
        let event = this.log[i]
        let item = this.log[i + 1]
        do {
            event = this.log[i]
            if (event.class === 'keyboard') {
                item = this.log[i + 1]
                if (event.class === item.class
                    && event.className === item.className
                    && event.event === item.event
                    && event.id === item.id
                    && event.name === item.name
                    && event.tag === item.tag
                    && event.type === item.type
                ) {
                    if(item.key.length > 1){
                        item.key = '<'+item.key+'>'
                    }
                    this.log[i].key = event.key + item.key
                    this.log.splice(i+1, 1)
                } else {
                    exit = true
                }
            } else {
                exit = true
            }
        } while (!exit)
    }
}

// const events = [
//     "abort",
//    "afterprint",
//    "beforeprint",
//    "beforeunload",
//    "blur",
//    "canplay",
//    "canplaythrough",
//    "change",
//    "click",
//    "copy",
//    "cuechange",
//    "cut",
//    "DOMContentLoaded",
//    "drag",
//    "dragend",
//    "dragenter",
//    "dragleave",
//    "dragover",
//    "dragstart",
//    "drop",
//    "durationchange",
//    "emptied",
//    "ended",
//    "error",
//    "focus",
//    "focusin",
//    "focusout",
//    "formchange",
//    "forminput",
//    "hashchange",
//    "input",
//    "invalid",
//    "keydown",
//    "keypress",
//    "keyup",
//    "load",
//    "loadeddata",
//    "loadedmetadata",
//    "loadstart",
//    "message",
// //    "mouseenter",
// //    "mouseleave",
// //    "mousemove",
// //    "mouseout",
//    "mousewheel",
//    "offline",
//    "online",
//    "pagehide",
//    "pageshow",
//    "paste",
//    "pause",
//    "play",
//    "playing",
//    "popstate",
//    "progress",
//    "ratechange",
//    "readystatechange",
//    "redo",
//    "reset",
//    "resize",
//    "scroll",
//    "seeked",
//    "seeking",
//    "select",
//    "show",
//    "stalled",
//    "storage",
//    "submit",
//    "suspend",
//    "timeupdate",
//    "undo",
//    "unload",
//    "volumechange",
//    "waiting"
//  ];