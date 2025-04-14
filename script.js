let taskList =  ["Do Laundry" , "Go to Market","Do Pushups"];

const todoListElement  = document.querySelector('.todo-list');


function renderTodoList(newTaskIndex = null) {
    let accumulator = '';

    taskList.forEach((task,index) => {
        const toAnimate = newTaskIndex === index ? "task-animate-add" : "";

        accumulator += `<div class="list ${toAnimate} ">
                        <p class="list-task" data-key="${index+1}">${index+1}. ${task}</p>
                        <button class="update" data-key="${index+1}">Update</button>
                        <button class="delete" data-key="${index+1}">
                            Delete
                        </button>
                        </div>`
    });
    todoListElement.innerHTML = accumulator;


    const taskDeleteElements = document.querySelectorAll('.delete');
    const taskUpdateElements = document.querySelectorAll('.update');

    taskDeleteElements.forEach((item) => {
        item.addEventListener("click",(e) => {
            let itemIndex = item.dataset.key -1;
            deleteTask(itemIndex);
        })
    });

    taskUpdateElements.forEach((item) => {
        item.addEventListener("click" , (e) => {
            let itemIndex = item.dataset.key -1;
            console.log(itemIndex);
            updateTask(itemIndex);
        })
    })



    const taskAnimateElements = document.querySelectorAll('.task-animate-add');
    taskAnimateElements.forEach((task)=> {
        task.addEventListener("animationend" , () => {
            task.classList.remove('task-animate-add');
        });
    });

}


renderTodoList()


function deleteTask(index){
    const taskElement = document.querySelector(`.list:nth-child(${index +1})`);
    taskElement.classList.add('task-animate-delete');
    taskElement.addEventListener('animationend',() => {
        taskList.splice(index,1);
        renderTodoList();
    })

}


const inputElement = document.querySelector('.task-input');
const addButtonElement = document.querySelector('.add-task');

addButtonElement.addEventListener("click" , () => {
    let task = inputElement.value;
    addTasks(task);
});


let timeoutID = null;
function addTasks(task) {

    if(task){
        inputElement.value = '';
        taskList.push(task);
        renderTodoList(taskList.length -1);
    }else{
        inputElement.setAttribute("placeholder" , 'CANNOT ENTER EMPTY TASKS');

        if(timeoutID ){
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(function () {

                inputElement.setAttribute("placeholder" , 'Enter Task');
                inputElement.style.setProperty('--placeholder-color',"white");
                timeoutID = null;
            },1000)
        


    }

}

function updateTask(index){
    console.log(index);
    const taskElement = document.querySelector(`.list-task[data-key="${index+1}"]`);
    const currentElement = taskElement.textContent.split('. ')[1];

    if(currentElement === undefined) currentElement = "";



    taskElement.innerHTML = `<input type="text" class='task-input2' value="${currentElement}">
        <button class="save-button">Save</button>
    `;

    const saveButtonElement = document.querySelector('.save-button');

    saveButtonElement.addEventListener("click", (e) => {
        const newTask = taskElement.querySelector('.task-input2').value.trim();
        if(newTask){
            taskList[index] = newTask;
            renderTodoList();
        }
    })
}
