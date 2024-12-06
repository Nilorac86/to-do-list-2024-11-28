const todoInput = document.querySelector("#todoInput");
const authorInput = document.querySelector("#authorInput");
const listContainer = document.querySelector("#todoList");
const button = document.querySelector("button");

let todos = JSON.parse(localStorage.getItem("todos")) || []; // ger tillbaka ett js object översatt från localstorage

// ###### Function som sparar todo i json format på localstorage ########
function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

// ######## Function för att rendera todo listan #############
function renderTodos() {
    listContainer.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoElement = document.createElement("li");
        
        todoElement.innerHTML = /*html*/`
        <div class="check-box">
        <span class="material-symbols-rounded checkbox" todoIndex="${index}">
        ${todo.checked ? 'radio_button_checked' : 'radio_button_unchecked'}
        </span>
        </div>
        <div class="enterTodo">
        ${todo.task} - ${todo.author}
        </div>
        <div class="action">
        <div class="move">
        <span class="arrow-up icon material-symbols-rounded" todoIndex= "${index}">
        keyboard_arrow_up
        </span> 
        <span class="arrow-down icon material-symbols-rounded" todoIndex= "${index}">
        keyboard_arrow_down
        </span>
        
        </div>
        <div class="delete">
        <span class="delete icon material-symbols-rounded close" 
        todoIndex="${index}">
            close
        </span>
        </div>
        </div>
        `;
        
        listContainer.appendChild(todoElement);
        
    });
}

// ########### Lägger till en ny todo #############
function addTodo() {
    const task = todoInput.value.trim();
    const author = authorInput.value.trim();

    if (task === "" || author === "") {
        alert("You have to enter a task and author");
        return;
    }

    const newTodoObj = {
        task: task,
        author: author,
        checked: false  // Lägger till en boolean av listobjektet
    };

    todos.push(newTodoObj); // Lägger till objektet 
    saveTodo();  
    renderTodos();  

    todoInput.value = ""; // Tömmer input efter submit
    authorInput.value = "";
}

// ########## Funktion för att ta bort todo ##############
function removeTodo(index) {
    todos.splice(index, 1);
    saveTodo();
    renderTodos();
}

// ########### Funktion för att checka av checkboxen ###############
function todoChecked(index) {
    todos[index].checked = !todos[index].checked;
    saveTodo();
    renderTodos();
};

//Function att flytta upp en todo

function moveTodoUp(index){ 
    if(index > 0){

        const todoMoveUp= todos[index];
        
        todos.splice(index, 1);
        todos.splice(index -1, 0, todoMoveUp);
        
        saveTodo();
        renderTodos();
    }
};

//Function att flytta ner en todo
function moveTodoDown(index){ 
    if(index < todos.length - 1){
    const todoToMoveDown = todos[index];
    
        todos.splice (index, 1);
        todos.splice(index +1, 0, todoToMoveDown);
        
        saveTodo();
        renderTodos();
    }
};



//  ########### Lägger till eventlyssnare på knappen #########
button.addEventListener("click", addTodo);

// Lägger till eventlyssnare på listan för att ta bort, flytta upp/ner och checka av listan
listContainer.addEventListener("click", function (event) {
    const index = event.target.getAttribute("todoIndex");

    if (event.target.classList.contains("close")) {
        removeTodo(index);
    }

    if (event.target.classList.contains("checkbox")) {
        todoChecked(index);
    }

       if (event.target.classList.contains("arrow-up")) {
    moveTodoUp(index);
}

if (event.target.classList.contains("arrow-down")) {
    moveTodoDown(index);
}

});

//  Uppdaterar säkerställer att inte samma todos läggs till när sidan laddas 
renderTodos();



