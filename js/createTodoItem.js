import * as classes from "./constants.js";
import * as dragAndDrop from './dragAndDrop.js'
import { deleteTodoItemHandler } from './deleteTodoItem.js'


// MAIN  function //////////////////
export function createTodoItemDomHandler(todoText) {
    let todoItemDom = createElementHandler("div", "", classes.TODO_ITEM_CLASS);

    let todoItemTextDom = createElementHandler(
        "div",
        todoText,
        classes.TODO_ITEM_TEXT_CLASS
    );
    let todoItemDoneDom = createElementHandler(
        "div",
        `<input type="checkbox" class=${classes.TODO_ITEM_CHECKBOX_CLASS}>`,
        classes.TODO_ITEM_DONE_CLASS
    );
    let todoItemDeleteDom = createElementHandler(
        "div",
        classes.DELETE_ICON,
        classes.TODO_ITEM_DELETE_CLASS
    );

    todoItemDom.append(todoItemTextDom, todoItemDoneDom, todoItemDeleteDom);
    
    todoItemDom.setAttribute("draggable", "true");
    todoItemDom.addEventListener("dragstart", dragAndDrop.dragStartHandler);
    todoItemDom.addEventListener("dragend", dragAndDrop.dragEndHandler);

    todoItemDeleteDom.addEventListener("click", deleteTodoItemHandler.bind(null, todoItemDom));

    return todoItemDom
};

// helper functions ////////////////////
function createElementHandler(
    elementType = "div",
    elementInnerHtml = "",
    elementClassName = ""
) {
    let todoItemType = document.createElement(elementType);
    todoItemType.innerHTML = elementInnerHtml;
    todoItemType.classList.add(elementClassName);
    return todoItemType;
};