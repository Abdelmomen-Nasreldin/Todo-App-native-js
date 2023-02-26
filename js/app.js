import * as classes from "./constants.js";
import * as dragAndDrop from "./dragAndDrop.js";
import { moveTodoItemToStateContainerHandler } from "./changeStateTodoItem.js";
import { addTodoItemHandler } from "./addTodoItem.js";
import { todoGroup, doneGroup } from "./addTodoItem.js";
import { saveItems, loadSavedItems } from "./storeItems.js"; 
import {
    createElementHandler,
    createTodoItemDomHandler,
} from "./createTodoItem.js";


const app = () => {
    let todoContainer = document.querySelector(
        `.${classes.TODO_OUTER_CONTAINER_CLASS}`
    );
    let addTodoBtn = todoContainer.querySelector(
        `#${classes.ADD_TODO_CONTAINER_ID} button`
    );
    let addTodoInput = todoContainer.querySelector(
        `#${classes.ADD_TODO_CONTAINER_ID} input`
    );
    let todoList = todoContainer.querySelector(`#${classes.TODO_CONTAINER_ID}`);
    let doneItemsDom = document.querySelector(`#${classes.DONE_CONTAINER_ID}`);
    let saveBtn = document.querySelector(`header button`);

    // const addTodoItem = addTodoItemHandler.bind(null, addTodoInput, todoList);

    // addTodoBtn.addEventListener("click", addTodoItem);
    addTodoBtn.addEventListener(
        "click",
        addTodoItemHandler.bind(null, addTodoInput, todoList)
    );
    todoList.addEventListener("change", (event) =>
        moveTodoItemToStateContainerHandler(doneItemsDom, event)
    );
    doneItemsDom.addEventListener(
        "change",
        moveTodoItemToStateContainerHandler.bind(null, todoList)
    );

    //drag and drop /////////////
    [todoList, doneItemsDom].forEach((dom) => {
        dom.addEventListener("dragenter", dragAndDrop.dragEnterHandler);
        dom.addEventListener("dragleave", dragAndDrop.dragLeaveHandler);
        dom.addEventListener("dragover", dragAndDrop.dragOvertHandler);
        dom.addEventListener("drop", dragAndDrop.dragDropHandler);
    });

    // save and load ///////////
    saveBtn.addEventListener("click", () => {
        saveItems("todoItems", todoGroup);
        saveItems("doneItems", doneGroup)
    });
    window.addEventListener("load", () => {
    loadSavedItems("todoItems", todoGroup, todoList)
    loadSavedItems("doneItems", doneGroup, doneItemsDom)
})
};

app();
