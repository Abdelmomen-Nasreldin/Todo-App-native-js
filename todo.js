let todoContainer = document.querySelector(".todo--outer--container");
let addTodoBtn = todoContainer.querySelector("#addTodo button");
let addTodoInput = todoContainer.querySelector("#addTodo input");
let todoList = todoContainer.querySelector("#todoList");
let firstTodoItem = todoList.querySelector(".todo--item");
let doneItemsDom = document.querySelector("#todoDoneItems");

let addTodoHandler = () => { // the short way  
    let copyTodoItem = firstTodoItem.cloneNode(true);
    copyTodoItem.firstElementChild.innerText = addTodoInput.value;
    // copyTodoItem.id = `${idGenerator++}`;
    todoList.append(copyTodoItem);
};
//////////////////////////
let idGenerator = 1;
// const todoItemsArr = [];
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

let createTodoItemDomHandler = (todoText) => {
    let todoItemText = createElementTemplateHandler(
        "div",
        todoText,
        "todo--item--text"
    );
    let todoItemDone = createElementTemplateHandler(
        "div",
        '<input type="checkbox" name="todoItemCheckbox" class="todo--item--checkbox">',
        "todo--item--done"
    );
    let todoItemDelete = createElementTemplateHandler(
        "div",
        "delete",
        "todo--item--delete"
    );

    let todoItemDom = `  
        <div class=${todoItemText.className}>
            ${todoItemText.innerHTML}
        </div>
        <div class=${todoItemDone.className}>
            ${todoItemDone.innerHTML}
        </div>
        <div class=${todoItemDelete.className} onClick=deleteTodoItem(this)>
        ${todoItemDelete.innerHTML}
        </div>
        `
    return todoItemDom
};

let addTodoHandlerAlternative = () => {
    let todoItemDom = createTodoItemDomHandler(addTodoInput.value);
    let todoItem = createElementTemplateHandler("div", todoItemDom, "todo--item");
    todoItem.id = `${idGenerator++}`;
    // let todoItemInnerHtml =  todoItemText + todoItemDone + todoItemDelete; // Not working
    todoList.append(todoItem)
};


function moveToDoneItemsDom(evt) { // more efficient
    const isChecked = evt.target.checked;
    console.log("move to done list");
    if (isChecked) {
        doneItemsDom.append(evt.target.closest(".todo--item"))
    }
}

// function moveToDoneItemsDom(){ // bad way
//     for (let index = 0; index < todoItemsArr.length; index++) {
//        const isChecked =  todoItemsArr[index].querySelector(".todo--item--checkbox").checked;
//        if (isChecked) {
//          doneItemsDom.append(todoItemsArr[index])
//        }
//     }
// }

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

addTodoBtn.addEventListener("click", addTodoHandlerAlternative);
todoList.addEventListener("change", (event) => moveToDoneItemsDom(event))
doneItemsDom.addEventListener("change", (event) => moveFromDoneItemsDomToTodoList(event))


// addTodoBtn.addEventListener("click", addTodoHandler.bind(this, addTodoInput.value)); // Not working
// addTodoBtn.addEventListener("click", addTodoHandler); // short way and there is no headache