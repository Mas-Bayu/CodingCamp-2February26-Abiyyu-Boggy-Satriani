const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const taskCount = document.getElementById('taskCount');

// 1. Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getTasks);

function handleAddTask() {
    const text = input.value.trim();
    if (text !== "") {
        createTaskElement(text, false);
        saveLocalTask(text, false); // Save to storage
        input.value = '';
        updateCount();
    }
}

function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    li.className = "task-item flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg group mb-3";
    
    const completedClass = isCompleted ? 'line-through opacity-40' : '';

    li.innerHTML = `
        <span class="flex-1 cursor-pointer text-slate-700 text-lg transition-all ${completedClass}">
            ${text}
        </span>
        <button class="delete-btn text-slate-400 hover:text-red-500 p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    `;

    // Toggle logic
    li.querySelector('span').addEventListener('click', function() {
        this.classList.toggle('line-through');
        this.classList.toggle('opacity-40');
        updateLocalTaskStatus(text);
    });

    // Delete logic
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        removeLocalTask(text);
        updateCount();
    });

    taskList.appendChild(li);
}

// --- LOCAL STORAGE FUNCTIONS ---

function saveLocalTask(taskText, completed) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
    updateCount();
}

function removeLocalTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const filteredTasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}

function updateLocalTaskStatus(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(t => {
        if(t.text === taskText) t.completed = !t.completed;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCount() {
    const count = taskList.children.length;
    taskCount.innerText = `${count} task${count !== 1 ? 's' : ''} left`;
}

// Clear all
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    taskList.innerHTML = '';
    updateCount();
});

addBtn.addEventListener('click', handleAddTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAddTask(); });