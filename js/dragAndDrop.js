// event.currentTarget refers to the element to which the even handler has been attached
// event.target refers to the element on which the event occurred (may be a child)
import * as classes from './constants.js';
import {switchTodoState} from "./changeStateTodoItem.js";
import { todoGroup, doneGroup } from "./addTodoItem.js";

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
        event.currentTarget.classList.add("bordered")
        
    
}
export function dragLeaveHandler(event) {
    if (event.relatedTarget.closest(`#${event.currentTarget.id}`)) {
        return;
    }
        event.currentTarget.classList.remove("bordered")
}

////////
export const dragOvertHandler = (event) => {
    event.preventDefault();
}


export function dragDropHandler(event) {
    const itemId = event.dataTransfer.getData("text/plain");
    const item = document.getElementById(itemId);

    // event.currentTarget refers to the element to which the even handler has been attached
    // event.target refers to the element on which the event occurred (may be a child)
    if (event.currentTarget.contains(item)) {
        return;
    }

    // if (this.contains(item)) {
    //     return;
    // }

    const checkBox = item.querySelector((`.${classes.TODO_ITEM_CHECKBOX_CLASS}`));
    checkBox.checked = !checkBox.checked;

    event.currentTarget.append(item)
    event.currentTarget.classList.remove("bordered")
    if (checkBox.checked === true) {
        switchTodoState(item.id, todoGroup, doneGroup)
    }else{
        switchTodoState(item.id, doneGroup, todoGroup)
    }
}
