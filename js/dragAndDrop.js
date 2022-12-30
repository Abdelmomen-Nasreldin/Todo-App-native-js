import * as classes from './constants.js';

export const dragStartHandler = (event) => {
    console.log("drag started");
    event.dataTransfer.setData("text/plain", event.target.id)
    event.dataTransfer.effectAllowed = "move";
    event.target.classList.add("dragging")
}
export const dragEndHandler = (event) => {
    event.preventDefault()
    console.log("drag ended");
    event.target.classList.remove("dragging")
    event.target.parentElement.classList.remove("bordered");
}
/////////
export function dragEnterHandler(event) {
    event.preventDefault();
        this.classList.add("bordered")
        
    
}
export function dragLeaveHandler(event) {
    if (event.relatedTarget.closest(`#${this.id}`)) {
        return;
    }
        this.classList.remove("bordered")
}
////////
export const dragOvertHandler = (event) => {
    event.preventDefault();
}


export function dragDropHandler(event) {
    const itemId = event.dataTransfer.getData("text/plain");
    const item = document.getElementById(itemId);

    if (this.contains(item)) {
        return;
    }

    const checkBox = item.querySelector((`.${classes.TODO_ITEM_CHECKBOX_CLASS}`));
    checkBox.checked = !checkBox.checked;
    this.append(item)
    this.classList.remove("bordered")
}