
import * as classes from "./constants.js";
import * as dragAndDrop from './dragAndDrop.js';
import { moveTodoItemToStateContainerHandler } from './changeStateTodoItem.js';
import { addTodoItemHandler } from "./addTodoItem.js";


const app = () => {

    let todoContainer = document.querySelector(`.${classes.TODO_OUTER_CONTAINER_CLASS}`);
    let addTodoBtn = todoContainer.querySelector(`#${classes.ADD_TODO_CONTAINER_ID} button`);
    let addTodoInput = todoContainer.querySelector(`#${classes.ADD_TODO_CONTAINER_ID} input`);
    let todoList = todoContainer.querySelector(`#${classes.TODO_CONTAINER_ID}`);
    let doneItemsDom = document.querySelector(`#${classes.DONE_CONTAINER_ID}`);

    const addTodoItem = addTodoItemHandler.bind(null, addTodoInput, todoList);

    addTodoBtn.addEventListener("click", addTodoItem);
    // addTodoBtn.addEventListener("click", addTodoItemHandler.bind(null, addTodoInput, todoList));
    todoList.addEventListener("change", (event) => moveTodoItemToStateContainerHandler(doneItemsDom, event));
    // doneItemsDom.addEventListener("change", (event) => fun.moveFromDoneItemsDomToTodoList(event, todoList));
    doneItemsDom.addEventListener("change", moveTodoItemToStateContainerHandler.bind(null, todoList));
    
    //drag and drop /////////////
    [todoList, doneItemsDom].forEach( dom => {
        dom.addEventListener("dragenter", dragAndDrop.dragEnterHandler.bind(dom));
        dom.addEventListener("dragleave", dragAndDrop.dragLeaveHandler.bind(dom));
        dom.addEventListener("dragover", dragAndDrop.dragOvertHandler.bind(dom));
        dom.addEventListener("drop", dragAndDrop.dragDropHandler.bind(dom));
    });
    
}

app();