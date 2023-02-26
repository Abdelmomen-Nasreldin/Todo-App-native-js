import * as classes from "./constants.js"
import { todoGroup, doneGroup } from "./addTodoItem.js";

export function deleteTodoItemHandler(item) {
    let ItemState = item.querySelector(`.${classes.TODO_ITEM_CHECKBOX_CLASS}`).checked;
    let deletedItemId = item.id;
    let deletedItemIndex = -1;
    if (ItemState) {
        deletedItemIndex = doneGroup.findIndex(ele => ele.id == deletedItemId);  
        doneGroup.splice(deletedItemIndex, 1);  
    }else{
        deletedItemIndex = todoGroup.indexOf(ele => ele.id == deletedItemId);  
        todoGroup.splice(deletedItemIndex, 1);  
    }
    item.remove();
    // console.log(todoGroup, doneGroup);
    console.log(`item with id = ${item.id} => was deleted`);
}
