 using Native Javascript and trying to write clean code as much as possible.
 
 preview: 
    - https://abdelmomen-nasreldin.github.io/Todo-App-native-js/

 consist of :

    - Todo List 
        - Todo Items 

    - Done List 
        - Done Items

    - the Only way to delete any item is to click on delete icon.  
        (being Done doesn't mean I want to delete it)    

 the first commit:
    - was written in a bad way (high coupling).

 the second commit:
    - was just for making the UI acceptable and adding abdelgwad.js (CURRING FUNCTION) (NOT USED).

 the third commit:
    - was editing the functions to be pure functions as much as possible and adding CONSTANTS. (low coupling).

  the fourth commit:
    - using the module to split the code to be more readable and maintainable.
    - refactor delete function.
    - refactor both moveTO functions to be one function moveTodoItemToStateContainerHandler for changing the state.

 the fifth commit:
    - add drag and drop functionality

 the sixth commit:   
   ...