// helper function
const curry = function (callback) {
    return function(...args) {
        if(args.length === 0){
            return callback.call(this)
        }
        return curry((...otherArgs)=> callback.call(this, ...args, ...otherArgs))
    }
}

// pure functions
let createElementTemplateHandler = curry((
    elementType ,
    elementInnerHtml,
    elementClassName,
) => {
    let todoItemType = document.createElement(elementType);
    todoItemType.innerHTML = elementInnerHtml;
    todoItemType.classList.add(elementClassName);
    return todoItemType;
});


const toggleErrorClass = curry((element, className, predicate) => {
    if (predicate(element)) {
        element.classList.add(className);
    }else{
        element.classList.remove(className);
    }
})

const toggleInputErrorClass = toggleErrorClass(addTodoInput,'error')

const div = createElementTemplateHandler('div')



const createTodoItemDomHandler = (todoText) => {

    const todoItem = div("","todo--item")();

    let todoItemText = div(
        todoText,
        "todo--item--text"
    )();
    let todoItemDone = div(
        '<input type="checkbox" name="todoItemCheckbox" class="todo--item--checkbox">',
        "todo--item--done"
    )();
    let todoItemDelete = div(
        "delete",
        "todo--item--delete"
    )();

    todoItemDelete.onclick=()=>{
        todoItem.remove()
    }
    todoItem.append(todoItemText,todoItemDone, todoItemDelete )

    return todoItem
};

// application

let id = 0

let addTodoHandlerAlternative = () => {
    let todoItemDom = createTodoItemDomHandler(addTodoInput.value);
    todoItemDom.id = id++
    todoList.prepend(todoItemDom)
};


function moveToDoneItemsDom(evt) { // more efficient
    const isChecked = evt.target.checked;
    if (isChecked) {
        doneItemsDom.append(evt.target.closest(".todo--item"))
    }
}

function moveFromDoneItemsDomToTodoList(evt) {
    const isChecked = evt.target.checked;
    if (!isChecked) {
        todoList.append(evt.target.closest(".todo--item"))
    }
}




const app = ()=> {
    let todoContainer = document.querySelector(".todo--outer--container");
    let addTodoBtn = todoContainer.querySelector("#addTodo button");
    let addTodoInput = todoContainer.querySelector("#addTodo input");
    let todoList = todoContainer.querySelector("#todoList");
    let doneItemsDom = document.querySelector("#todoDoneItems");

    addTodoBtn.addEventListener("click", ()=> {
        toggleInputErrorClass((element)=>element.value.length < 1)()

        if (addTodoInput.value.length < 1) {
            return;
        }
        addTodoHandlerAlternative()

    });
    todoList.addEventListener("change", (event) => moveToDoneItemsDom(event))
    doneItemsDom.addEventListener("change", (event) => moveFromDoneItemsDomToTodoList(event))

}

app()