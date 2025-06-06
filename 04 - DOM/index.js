document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "'todo-list' not found";
    window.todoList = todoList;

    const appendTaskButton = document.getElementById('append-task');
    if(!appendTaskButton) throw "'append-task' not found";

    appendTaskButton.addEventListener('click', appendTaskClick);

    const printTasksButton = document.getElementById('print-tasks');
    if(!printTasksButton) throw "'print-tasks' not found";

    printTasksButton.addEventListener('click', printTasks);

    updateClickListener();
   
    
});

function appendTaskClick(e){
    const li = document.querySelector('#copy-task');
    const task = li.cloneNode(true);
    const taskTxt = prompt('Enter task text:', 'New Task');
    task.firstElementChild.innerText = taskTxt || 'New Task';
    task.style.display = 'block';
    task.removeAttribute('id');

    window.todoList.appendChild(task);
    updateClickListener();
}

function upClick(e) {
    const li = e.currentTarget.closest('li');
    const prevLi = li.previousElementSibling;

    if (prevLi && prevLi.id !== 'copy-task') {
        window.todoList.insertBefore(li, prevLi);
        console.log('Moved up:', li.innerText);
    } else {
        alert('Cannot move up, already at the top or is the copy task');
    }
}

function downClick(e){
    const li = e.target.closest('li');
    const nextLi = li.nextElementSibling;
    if(nextLi){
        window.todoList.insertBefore(nextLi, li);
    }
}

function insertButtonClick(e){
    const li = document.querySelector('#copy-task');
    const task = li.cloneNode(true);
    const taskTxt = prompt('Enter task text:', 'New Task');
    task.firstElementChild.innerText = taskTxt || 'New Task';
    task.style.display = 'block';
    task.removeAttribute('id');
    

    window.todoList.insertBefore(task, e.target.closest('li'));
    updateClickListener();
}

function updateClickListener(){
    for(let btn of  document.querySelectorAll('[data-action="insert"]')){
        btn.addEventListener('click', insertButtonClick);
    }

    for(let btn of  document.querySelectorAll('[data-action="delete"]')){
        btn.addEventListener('click', deleteButtonClick);
    }

    for(let btn of  document.querySelectorAll('[data-action="move-up"]')){
        btn.addEventListener('click', upClick);
    }

    for(let btn of  document.querySelectorAll('[data-action="move-down"]')){
        btn.addEventListener('click', downClick);
    }

    for(let btn of document.querySelectorAll('[data-action="edit"]')){
        btn.addEventListener('click', edit);
    }
}

function deleteButtonClick(e){
    const li = e.target.closest('li');
    li.remove();
}

function printTasks(){
    var txt = '';
    var flag = false;
    for(let li of todoList.children){
        if(!flag){
            flag = true;
            continue;
        }
        txt += li.innerText + '\r\n';
        console.log(li.innerText);
    }

    const sheet = document.querySelector('#sheet');
    sheet.innerText = txt;
    document.body.appendChild(sheet);
}

function edit(e){
    const li = e.target.closest('li');
    const taskTxt = prompt('Edit task text:', li.firstElementChild.innerText);
    if(taskTxt !== null) {
        li.firstElementChild.innerText = taskTxt || 'New Task';
    }
}