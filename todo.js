 let todoList = [];

function addtodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoitem = inputElement.value;
    let tododate = dateElement.value;
    if (!todoitem || !tododate) return;
    todoList.push({ item: todoitem, duedate: tododate, done: false });
    inputElement.value = '';
    dateElement.value = '';

    displayItems();
    updateWeeklyPlanner();
}

function displayItems() {
    let displayElement = document.querySelector('.todo-items');
    let newHtml = '';

    for (let i = 0; i < todoList.length; i++) {
        let item = todoList[i].item;
        let duedate = todoList[i].duedate;

       newHtml += `
<div>
    <span style="text-decoration: ${todoList[i].done ? 'line-through' : 'none'};">
        ${item}
    </span>
    <span>${duedate}</span>
    <button onclick="todoList[${i}].done = !todoList[${i}].done; displayItems();">
        ${todoList[i].done ? 'Undo' : 'Done'}
    </button>
    <button onclick="todoList.splice(${i}, 1); displayItems();">Delete</button>
</div>
`;
    }
    displayElement.innerHTML = newHtml;
}
 function showTasks() {
      document.querySelector('.todo-items').style.display = 'block';
      document.querySelector('.weekly-planner').style.display = 'none';
      document.getElementById('tasks-tab').classList.add('active-tab');
      document.getElementById('planner-tab').classList.remove('active-tab');
    }

    function showPlanner() {
      document.querySelector('.todo-items').style.display = 'none';
      document.querySelector('.weekly-planner').style.display = 'grid';
      document.getElementById('planner-tab').classList.add('active-tab');
      document.getElementById('tasks-tab').classList.remove('active-tab');
    }
    showTasks();
function getDayAbbreviation(dateStr) {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}
function updateWeeklyPlanner() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayDiv = document.getElementById('day-' + day);
        while (dayDiv.childNodes.length > 1) {
            dayDiv.removeChild(dayDiv.lastChild);
        }
    });
    todoList.forEach(task => {
        const day = getDayAbbreviation(task.duedate);
        const dayDiv = document.getElementById('day-' + day);
        if (dayDiv) {
            const taskDiv = document.createElement('div');
     taskDiv.classList.add('planner-task');

          const textSpan = document.createElement('span');
         textSpan.textContent = task.item;
 
         const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✖';
         deleteBtn.className = 'delete-task';
        deleteBtn.onclick = () => {
    const index = todoList.indexOf(task);
    if (index > -1) {
        todoList.splice(index, 1);
        displayItems();
        updateWeeklyPlanner();
    }
};

taskDiv.appendChild(textSpan);
taskDiv.appendChild(deleteBtn);
dayDiv.appendChild(taskDiv);

        }
    });
}
function handlePlannerInput(event, cellId) {
  if (event.key === 'Enter') {
    const input = event.target;
    const value = input.value.trim();
    if (!value) return;

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('planner-task');

    const textSpan = document.createElement('span');
    textSpan.textContent = value;
    taskDiv.appendChild(textSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.className = 'delete-task';
    deleteBtn.onclick = () => {
      taskDiv.remove();
    };
    taskDiv.appendChild(deleteBtn);

    document.getElementById(cellId).appendChild(taskDiv);
    input.value = '';
  }
}
