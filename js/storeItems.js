import * as classes from "./constants.js";
import { createTodoItemDomHandler } from "./createTodoItem.js";

export let saveItems = (key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
}

export let loadSavedItems = (key, arrToSaveIn, parentDom)=>{
  
    const savedItems = JSON.parse(localStorage.getItem(key));
    if (savedItems && savedItems.length != 0) {
        for (let i = 0; i < savedItems.length; i++) {
            arrToSaveIn[i] = savedItems[i];

            let savedItem = createTodoItemDomHandler(savedItems[i].text);
            savedItem.id = savedItems[i].id;
            if (key == "doneItems") {
                savedItem.querySelector(`.${classes.TODO_ITEM_CHECKBOX_CLASS}`).checked = true;
            }
            parentDom.append(savedItem);
        }
    }
}