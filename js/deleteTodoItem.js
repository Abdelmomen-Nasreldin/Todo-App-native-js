import * as classes from "./constants.js"

export function deleteTodoItemHandler(item) {
    item.remove();
    console.log(`item with id = ${item.id} => was deleted`);
}
