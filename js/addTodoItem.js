import * as classes from "./constants.js";

import { createTodoItemDomHandler } from './createTodoItem.js'


let idGenerator = 1; // It is okay here

// MAIN  function //////////////////
export let addTodoItemHandler = (inputEl, todoBox) => {
    let inputValue = checkIfThereIsInputValue(inputEl);

    let todoItemDom = createTodoItemDomHandler(inputValue);
    todoItemDom.id = idGenerator++;
    todoBox.prepend(todoItemDom);
    inputEl.value = "";
    console.log(`new item with id = ${todoItemDom.id} => was added to Todo List`);
    return todoItemDom;
};

// helper functions ////////////////////
function checkIfThereIsInputValue(inputEl)  {
    if (!inputEl.value.trim().length) {
        inputEl.classList.add(classes.ERROR_CLASS);
        throw "must enter Todo Item Text";
    }
    inputEl.classList.remove(classes.ERROR_CLASS);
    return inputEl.value;
}
