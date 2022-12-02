import * as classes from "./constants.js"

export function moveTodoItemToStateContainerHandler(stateContainer, evt) {
    const item = evt.target.closest(`.${classes.TODO_ITEM_CLASS}`);
    stateContainer.append(item);
}



