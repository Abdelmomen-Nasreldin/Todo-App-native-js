let todoContainer = document.querySelector(".todo--outer--container");
let addTodoBtn = todoContainer.querySelector("#addTodo button");
let addTodoInput = todoContainer.querySelector("#addTodo input");
let todoList = todoContainer.querySelector("#todoList");
let firstTodoItem = todoList.querySelector(".todo--item");
let doneItemsDom = document.querySelector("#todoDoneItems");

let addTodoHandler = () => { // the short way  
    let copyTodoItem = firstTodoItem.cloneNode(true);
    copyTodoItem.firstElementChild.innerText = addTodoInput.value;
    // copyTodoItem.id = idGenerator++;
    todoList.prepend(copyTodoItem);
};
//////////////////////////
let idGenerator = 1;

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
let checkIfThereIsInputValue = () => {
    let inputValue = addTodoInput.value
    if (inputValue.trim().length == 0) {
        addTodoInput.classList.add("error");
        return
    }
    addTodoInput.classList.remove("error");
    return inputValue
}
let createTodoItemDomHandler = (todoText) => { // Pure function Alhamdullah
    let todoItemDom = createElementTemplateHandler("div", "", "todo--item");

    let todoItemTextDom = createElementTemplateHandler(
        "div",
        todoText,
        "todo--item--text"
    );
    let todoItemDoneDom = createElementTemplateHandler(
        "div",
        '<input type="checkbox" name="todoItemCheckbox" class="todo--item--checkbox">',
        "todo--item--done"
    );
    let todoItemDeleteDom = createElementTemplateHandler(
        "div",
        "delete",
        "todo--item--delete"
    );
    todoItemDom.append(todoItemTextDom, todoItemDoneDom, todoItemDeleteDom)

    todoItemDeleteDom.addEventListener("click", deleteTodoItem.bind(this,todoItemDeleteDom))

    return todoItemDom
};

let addTodoHandlerAlternative = (inputValue) => {
    if (!checkIfThereIsInputValue()) {
        return;
    }
    let todoItemDom = createTodoItemDomHandler(inputValue)
    todoItemDom.id = idGenerator++;
    todoList.prepend(todoItemDom)
};


function moveToDoneItemsDom(evt) { 
    const isChecked = evt.target.checked;
    console.log("move to done list");
    if (isChecked) {
        doneItemsDom.append(evt.target.closest(".todo--item"))
    }
}

function moveFromDoneItemsDomToTodoList(evt) {
    console.log("move to todo list");
    const isChecked = evt.target.checked;
    if (isChecked) {
        return;
    }
    todoList.append(evt.target.closest(".todo--item"))

}

function deleteTodoItem(item) {
    console.log("delete");
    item.closest((".todo--item")).remove();
}

addTodoBtn.addEventListener("click", ()=>addTodoHandlerAlternative(addTodoInput.value));
todoList.addEventListener("change", (event) => moveToDoneItemsDom(event))
doneItemsDom.addEventListener("change", (event) => moveFromDoneItemsDomToTodoList(event))


// addTodoBtn.addEventListener("click", addTodoHandler.bind(this, addTodoInput.value)); // Not working
// addTodoBtn.addEventListener("click", addTodoHandler); // short way and there is no headache
