const todoInput = document.querySelector("#todoInput");
const authorInput = document.querySelector("#authorInput");
const listContainer = document.querySelector("#todoList");
const button = document.querySelector("button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Rendera todos listan
function renderTodos() {
    listContainer.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoElement = document.createElement("li");
        
        todoElement.innerHTML = `
        <span class="material-symbols-rounded checkbox" todoIndex="${index}">
        ${todo.checked ? 'radio_button_checked' : 'radio_button_unchecked'}
        </span>
        ${todo.task} - ${todo.author}
        <span class="material-symbols-rounded">
        keyboard_arrow_down
        </span>
        <span class="material-symbols-rounded">
        keyboard_arrow_up
        </span>
        <span class="material-symbols-rounded close" 
        todoIndex="${index}">
            close
        </span>`;
        listContainer.appendChild(todoElement);
    });
}

// Lägg till en ny todo
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
        checked: false  // Lägg till checked-egenskapen
    };


    todos.push(newTodoObj); 
    saveTodo();  
    renderTodos();  

    todoInput.value = "";
    authorInput.value = "";
}

// Funktion för att ta bort todo
function removeTodo(index) {
    todos.splice(index, 1);
    saveTodo();
    renderTodos();
}

// Funktion för att toggla checkboxen
function toggleTodoChecked(index) {
    todos[index].checked = !todos[index].checked;
    saveTodo();
    renderTodos();
};

// Lägg till eventlyssnare på knappen
button.addEventListener("click", addTodo);

// Lägg till eventlyssnare på listan (för att ta bort eller toggla en todo)
listContainer.addEventListener("click", function (event) {
    const index = event.target.getAttribute("todoIndex");

    if (event.target.classList.contains("close")) {
        removeTodo(index);
    }

    if (event.target.classList.contains("checkbox")) {
        toggleTodoChecked(index);
    }
});

// Rendera todos när sidan laddas
renderTodos();
