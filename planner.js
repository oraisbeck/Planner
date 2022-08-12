////////////////Local Storage///////////
todos = JSON.parse(localStorage.getItem('todos')) || [];


//////////////////Tabs////////////////
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

///////////////Schedule//////////////////
const form = document.querySelector("#new-time");
const timeT = document.getElementById('new-time-input');
const timeN = document.getElementById('new-time-task-input');
const clear_el = document.getElementById('clear');


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(timeN.value === '' || timeT.value === ''){
        alert("fill out");
        return;
    }

    const todo = {
        time: e.target.elements.time.value,
        task: e.target.elements.task.value,
        done: false,
        createdAt: new Date().getTime()
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    DisplayTodos()
})
DisplayTodos();


function DisplayTodos(){
    const list_el = document.querySelector('#time-tasks');
    list_el.innerHTML = "";
    todos.forEach(todo => {
        const task_el = document.createElement("div");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_time_el = document.createElement("div");
        task_time_el.classList.add("time");

        task_el.appendChild(task_time_el);
        task_el.appendChild(task_content_el);

        const task_input_time_el = document.createElement("input");
        task_input_time_el.classList.add("text");
        task_input_time_el.id = "input";
        task_input_time_el.type = "text";
        task_input_time_el.value = todo.time;
        task_input_time_el.setAttribute("readonly", "readonly");

        const task_input_task_el = document.createElement("input");
        task_input_task_el.classList.add("text");
        task_input_task_el.id = "schedule";
        task_input_task_el.type = "text";
        task_input_task_el.value = todo.task;
        task_input_task_el.setAttribute("readonly", "readonly");

        task_time_el.appendChild(task_input_time_el);
        task_content_el.appendChild(task_input_task_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Complete";

        const task_undo_el = document.createElement("button");
        task_undo_el.classList.add("undo");
        task_undo_el.innerHTML = "Undo";

        if(todo.done){
            task_el.classList.add("comp-task")
            task_actions_el.appendChild(task_undo_el);
        }
        else{
            task_el.classList.add("task");
            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);
        }


        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el)

        task_edit_el.addEventListener('click', () =>{
            if(task_edit_el.innerText.toLowerCase() == 'edit'){  //edit
                task_input_task_el.removeAttribute("readonly");
                task_input_task_el.focus();
                task_input_time_el.removeAttribute("readonly");
                task_input_time_el.focus();
                task_edit_el.innerText = "Save";
                task_delete_el.innerText = "Delete";
            }
            else{ //save
                task_input_time_el.setAttribute('readonly', true);
                task_input_task_el.setAttribute('readonly', true);
                todo.time = task_input_time_el.value;
                todo.task = task_input_task_el.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()
            }
        })

        task_delete_el.addEventListener('click', () =>{
            if(task_delete_el.innerText.toLowerCase() == 'delete'){ //delete
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos()
            }
            else{ //complete
                todo.done = true;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            }
        })

        task_undo_el.addEventListener('click', () =>{ //undo
            todo.done = false;
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

        clear_el.addEventListener('click', () =>{
            localStorage.clear();
            todos = JSON.parse(localStorage.getItem('todos')) || [];
            DisplayTodos();
        })
    })
}

