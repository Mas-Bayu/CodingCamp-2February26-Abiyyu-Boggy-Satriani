let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    // validation to check if both fields are filled
    if (todoInput.value.trim() === ''|| todoDate.value === '') {
        alert("Please enter the todo and due date.");
        return;
    } else {
        const newTodo = {
            todo: todoInput.value.trim(),
            date: todoDate.value
        };
        todos.push(newTodo);
        console.log('todo added:', todos);

        todoInput.value = '';
        todoDate.value = '';

        renderTodos();
    }
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');

    todoList.innerHTML = '';

    todos.forEach((item, index) => {
        todoList.innerHTML += `
        <li>
            <p class="text-xl">${item.todo} - <span class="text-sm text-gray-500">${item.date}</span></p>
            <hr />
        </li>
        `;
    });
}

function deleteAllTodos() {
    todos = [];
    renderTodos();
}

function filterTodos() {
    
}