// Constants //////////////////////////
const TODO_ITEM_CLASS = "todo--item";
const TODO_ITEM_TEXT_CLASS = "todo--item--text";
const TODO_ITEM_DONE_CLASS = "todo--item--done";
const TODO_ITEM_DELETE_CLASS = "todo--item--delete";
const TODO_ITEM_CHECKBOX_CLASS = "todo--item--checkbox";
const ERROR_CLASS = "error";

const DELETE_ICON = '<i class="fa-regular fa-trash-can"></i>';

// Functions /////////////////////////////
let idGenerator = 1; // It is okay here
let addTodoHandler = (copyEl, inputValue, todoBox) => { // the short way  
    let copyTodoItem = copyEl.cloneNode(true);
    copyTodoItem.firstElementChild.innerText = inputValue;
    // copyTodoItem.id = idGenerator++;
    todoBox.prepend(copyTodoItem);
};

// Alternative and the used one here ///////////////////////
let createElementTemplateHandler = (
    elementType = "div",
    elementInnerHtml = "",
    elementClassName = ""
) => {
    let todoItemType = document.createElement(elementType);
    todoItemType.innerHTML = elementInnerHtml;
    todoItemType.classList.add(elementClassName);
    return todoItemType;
};
let checkIfThereIsInputValue = (inputEl) => {
    if (inputEl.value.trim().length == 0) {
        inputEl.classList.add(ERROR_CLASS);
        return
    }
    inputEl.classList.remove(ERROR_CLASS);
    return inputEl.value
}
let createTodoItemDomHandler = (todoText) => {
    let todoItemDom = createElementTemplateHandler("div", "", TODO_ITEM_CLASS);
    todoItemDom.id = idGenerator++;

    let todoItemTextDom = createElementTemplateHandler(
        "div",
        todoText,
        TODO_ITEM_TEXT_CLASS
    );
    let todoItemDoneDom = createElementTemplateHandler(
        "div",
        `<input type="checkbox" class=${TODO_ITEM_CHECKBOX_CLASS}>`,
        TODO_ITEM_DONE_CLASS
    );
    let todoItemDeleteDom = createElementTemplateHandler(
        "div",
        DELETE_ICON,
        TODO_ITEM_DELETE_CLASS
    );

    todoItemDom.append(todoItemTextDom, todoItemDoneDom, todoItemDeleteDom)

    todoItemDeleteDom.addEventListener("click", deleteTodoItem)

    return todoItemDom
};

let addTodoHandlerAlternative = (inputEl, todoBox) => {
    let inputValue = checkIfThereIsInputValue(inputEl)
    if (!inputValue) {
        return;
    }

    let todoItemDom = createTodoItemDomHandler(inputValue);
    todoBox.prepend(todoItemDom)
    inputEl.value = "";
};

function moveToDoneItemsDom(evt, doneBox) {
    const isChecked = evt.target.checked;
    if (isChecked) {
        doneBox.append(evt.target.closest(`.${TODO_ITEM_CLASS}`));
        console.log("moved to done list");
    }
}

function moveFromDoneItemsDomToTodoList(evt, todoBox) {
    const isChecked = evt.target.checked;
    if (isChecked) {
        return;
    }
    todoBox.append(evt.target.closest(`.${TODO_ITEM_CLASS}`))
    console.log("moved to todo list");
}

function deleteTodoItem() {
    this.closest((`.${TODO_ITEM_CLASS}`)).remove();
    console.log("item deleted");
}


const app = () => {
    
    let todoContainer = document.querySelector(".todo--outer--container");
    let addTodoBtn = todoContainer.querySelector("#addTodo button");
    let addTodoInput = todoContainer.querySelector("#addTodo input");
    let todoList = todoContainer.querySelector("#todoList");
    let doneItemsDom = document.querySelector("#todoDoneItems");
    // let firstTodoItem = todoList.querySelector(".todo--item");


    addTodoBtn.addEventListener("click", addTodoHandlerAlternative.bind(null, addTodoInput, todoList));
    todoList.addEventListener("change", (event) => moveToDoneItemsDom(event, doneItemsDom))
    doneItemsDom.addEventListener("change", (event) => moveFromDoneItemsDomToTodoList(event, todoList))

    // addTodoBtn.addEventListener("click", addTodoHandler.bind(null, firstTodoItem, addTodoInput.value, todoList)); // short way and there is no headache
}

app();