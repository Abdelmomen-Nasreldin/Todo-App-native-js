import * as classes from "./constants.js";

import { createTodoItemDomHandler } from './createTodoItem.js'

export const todoGroup = [];
export const  doneGroup = [];

let idGenerator = 1; // It is okay here
// MAIN  function //////////////////
export let addTodoItemHandler = (inputEl, todoBox) => {
    let inputValue = checkIfThereIsInputValue(inputEl);

    let todoItemDom = createTodoItemDomHandler(inputValue);
    todoItemDom.id = idGenerator++;
   
    todoBox.append(todoItemDom);
    inputEl.value = "";
    console.log(`new item with id = ${todoItemDom.id} => was added to Todo List`);

    const todoItem = {
        id: todoItemDom.id,
        text: inputValue,
        isDone : false
    }
    todoGroup.push(todoItem)
    console.log(todoGroup);
    // saveTodos(todoGroup)
    // return todoItemDom;
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

// function saveTodos(key) {
// if (key == todoGroup) {
//     localStorage.setItem(`todoGroup`, JSON.stringify(key))
// }else{
//     localStorage.setItem(`doneGroup`, JSON.stringify(key))
// }
// }
