
import * as classes from "./constants.js"
import { moveTodoItemToStateContainerHandler } from './changeStateTodoItem.js';
import { addTodoItemHandler } from "./addTodoItem.js";

const app = () => {

    let todoContainer = document.querySelector(`.${classes.TODO_OUTER_CONTAINER_CLASS}`);
    let addTodoBtn = todoContainer.querySelector(`#${classes.ADD_TODO_CONTAINER_ID} button`);
    let addTodoInput = todoContainer.querySelector(`#${classes.ADD_TODO_CONTAINER_ID} input`);
    let todoList = todoContainer.querySelector(`#${classes.TODO_CONTAINER_ID}`);
    let doneItemsDom = document.querySelector(`#${classes.DONE_CONTAINER_ID}`);

    addTodoBtn.addEventListener("click", addTodoItemHandler.bind(null, addTodoInput, todoList));
    todoList.addEventListener("change", (event) => moveTodoItemToStateContainerHandler(doneItemsDom, event));
    // doneItemsDom.addEventListener("change", (event) => fun.moveFromDoneItemsDomToTodoList(event, todoList));
    doneItemsDom.addEventListener("change", moveTodoItemToStateContainerHandler.bind(this, todoList));

}

app();