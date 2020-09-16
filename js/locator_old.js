// function getOptimizedXPath(element) {
//     let tag = getTag(element),
//         id = getId(element), noId = false,
//         text = getText(element), noText = false,
//         title = getTitle(element), noTitle = false,
//         value = getValue(element), noValue = false;
    
//     let xpath = `${tag}`;
//     id !== undefined ? xpath += id : noId = true;
//     text !== undefined ? xpath += text : noText = true;
//     title !== undefined ? xpath += title : noTitle = true;
//     value !== undefined ? xpath += value : noValue = true;
    

//     if(noId && noText && noTitle && noValue){
//         let parentXpath = getOptimizedXPath(element.parentNode);
//         xpath = `${parentXpath}/${xpath}`;
//     }

//     // console.log(xpath);
//     return `${xpath}`;
// }

// function getTag(e){
//     if (e.tagName !== '') {
//         return `${e.tagName.toLowerCase()}`;
//     }
// }

// function getId(e){
//     if (e.id !== '') {
//         return `[@id='${e.id}']`;
//     }
// }

// function getTitle(e) {
//     if (e.title !== undefined && e.title !== '') {
//         return `[@title='${e.title}']`;
//     }
// }

// function getValue(e) {
//     if (e.type === 'submit' && e.value !== undefined) {
//         return `[@value='${e.value}']`;
//     }
// }

// function getText(e) {
//     if (e.textContent !== undefined && e.textContent !== '' && e.textContent.length < 20) {
//         return `[.='${e.textContent}']`;
//     }
// }