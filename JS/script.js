let todos = [];
let originalTodos = []; // Stores the order tasks were added

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value.trim() === '' || todoDate.value === '') {
        alert("Please enter the todo and due date.");
        return;
    }

    const newTodo = {
        todo: todoInput.value.trim(),
        date: todoDate.value
    };

    todos.push(newTodo);
    originalTodos = [...todos]; // Update the backup list

    todoInput.value = '';
    todoDate.value = '';

    renderTodos(todos);
}

function renderTodos(listToRender = todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    if (listToRender.length === 0) {
        todoList.innerHTML = '<li>There are no errands to run right now.</li>';
        return;
    }

    listToRender.forEach((item) => {
        todoList.innerHTML += `
        <li class="py-2">
            <p class="text-xl">${item.todo} - <span class="text-sm text-gray-500">${item.date}</span></p>
            <hr />
        </li>
        `;
    });
}

// Function: Sorts by Date
function sortByNearestDate() {
    // 1. Sort the actual 'todos' data array
    todos.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // This sorts from soonest (nearest) to furthest
        return dateA - dateB; 
    });

    // 2. Re-render the list so the user sees the new order
    renderTodos(); 
}

// NEW Function: Resets to original addition order
function resetSort() {
    todos = [...originalTodos]; // Restore from the backup
    renderTodos(todos);
}

// Function: Live Search
function searchTodos() {
    const searchText = document.getElementById('filter-errand').value.toLowerCase();
    const filteredTodos = todos.filter(item => 
        item.todo.toLowerCase().includes(searchText)
    );
    renderTodos(filteredTodos);
}

function deleteAllTodos() {
    todos = [];
    originalTodos = [];
    renderTodos();
}