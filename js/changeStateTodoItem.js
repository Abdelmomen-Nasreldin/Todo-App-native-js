import * as classes from "./constants.js"
import { todoGroup, doneGroup } from "./addTodoItem.js";



export function moveTodoItemToStateContainerHandler(stateContainer, event) {
    // console.log(event);
    console.log(event.target.tagName);
    if (event.target.className == classes.TODO_ITEM_CHECKBOX_CLASS) {
        let item = event.target.closest(`.${classes.TODO_ITEM_CLASS}`);
        stateContainer.append(item);
        
        if (event.target.checked == true) {
            switchTodoState(item.id, todoGroup, doneGroup)
        }else{
            switchTodoState(item.id, doneGroup, todoGroup)
        }
    }
}

export function switchTodoState(itemID, groupOut, groupIn) {

    let item = groupOut.find(ele=> ele.id == itemID)
    console.log(item, itemID);
    groupOut.forEach((ele, index, arr)=>{
        if (ele.id == itemID) {
            arr.splice(index, 1);
        }
    })
    item.isDone = !item.isDone;
    groupIn.push(item);
    console.log(todoGroup, doneGroup);
}


// export function moveTodoItemToStateContainerHandler(stateContainer, event) {
//     console.log(event);
//     const item = event.target.closest(`.${classes.TODO_ITEM_CLASS}`);
//     stateContainer.append(item);
// }


