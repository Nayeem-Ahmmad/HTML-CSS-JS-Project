
//In the name of allah

function showHoriTab(event, id){

    document.querySelectorAll('.hori-box').forEach(box => {
        box.classList.remove('active-box');
    });

    document.querySelectorAll('.hori-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(id).classList.add('active-box');
    event.currentTarget.classList.add('active');
}

function showVerTab(event, id){

    const horiBox = event.currentTarget.closest('.hori-box');

    horiBox.querySelectorAll('.ver-box').forEach(box => {
        box.classList.remove('active-box');
    });

    horiBox.querySelectorAll('.ver-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    horiBox.querySelector('#' + id).classList.add('active-box');
    event.currentTarget.classList.add('active');
}


/////////////////////
// Kto din age todo ta created kora hoyeche seta dekhab....

// HTML selectors
const container = document.querySelector(".container");
const todoForm = container.querySelector(".todoForm");
const inputTodo = container.querySelector(".todoinput");
const todoList = container.querySelector(".todoList");
const message = container.querySelector(".statusMes");

// Show status message
const showStatusMessage = (text, status) => {
    message.textContent = text;
    message.classList.add(`${status}`);
    setTimeout(() => {
        message.textContent = "";
        message.classList.remove(`${status}`);
    }, 2000);
    alert("Todo created successfully")
};

// Get todos from localStorage
const getTodosLocal = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
};

// Save todos to localStorage
const saveTodosLocal = (todos) => {
    localStorage.setItem("mytodos", JSON.stringify(todos));
};

// Get today date in your format (for display)
const getDateFormat = () => {
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[today.getMonth()];
    return `${day} ${month}, ${year}`;
};

// Calculate X days ago
const getDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
};

// Create todo
const createTodo = (id, value, done = false, CreatedAt = null) => {
    const todoElement = document.createElement("li");
    todoElement.id = id;
    todoElement.classList.add("list-style");

    todoElement.innerHTML = `
        <span><label><input type="checkbox" class="agree"></label></span>
        <span class="textValue">${value}</span>
        <span class="todayDate"></span>
        <span class="hbtn">
            <p class="delect"> Delete </p>
            <button class="todobtn deleteButton"><i class="fa-solid fa-trash"></i></button> 
        </span>
    `;

    // FIX: hover popup text X days ago
    if (!CreatedAt) {
        const temp = new Date().toISOString();
        todoElement.dataset.created = temp;
        todoElement.style.setProperty('--before-text', `"${getDaysAgo(temp)}"`);
    } else {
        todoElement.dataset.created = CreatedAt;
        todoElement.style.setProperty('--before-text', `"${getDaysAgo(CreatedAt)}"`);
    }

    const checkbox = todoElement.querySelector(".agree");
    const text = todoElement.querySelector(".textValue");
    const deleteButton = todoElement.querySelector(".deleteButton");

    todoElement.querySelector(".todayDate").innerText = getDateFormat();

    checkbox.checked = done;
    text.classList.toggle("done", done);

    // Checkbox change
    checkbox.addEventListener("change", () => {
        text.classList.toggle("done", checkbox.checked);
        const todos = getTodosLocal();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].done = checkbox.checked;
            saveTodosLocal(todos);
        }
        renderTodos();
    });

    // Delete
    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this ToDo?")) {
            let todos = getTodosLocal().filter(todo => todo.id !== id);
            saveTodosLocal(todos);
            renderTodos();
            showStatusMessage("", "");
            alert("Todo Deleted Successfully");
        }
    });

    todoList.appendChild(todoElement);
};

// Add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = inputTodo.value.trim();
    if (todoValue === "") return;

    const id = Date.now().toString();

    // NEW: store actual date in ISO format
    const createdAt = new Date().toISOString();

    createTodo(id, todoValue, false, createdAt);

    const todos = getTodosLocal();
    todos.push({id, todoValue, done: false, CreatedAt: createdAt});
    saveTodosLocal(todos);

    renderTodos();
    if( alert("Are you sure create a todo?") ){
        showStatusMessage("Todo is created", "status");
    }
    inputTodo.value = "";
};

// Load todos
const loadTodos = () => {
    const todos = getTodosLocal();
    todos.sort((a,b) => a.done - b.done);
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done, todo.CreatedAt || null));
};

// Render todos
const renderTodos = () => {
    todoList.innerHTML = "";
    const todos = getTodosLocal();
    todos.sort((a,b) => a.done - b.done);
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done, todo.CreatedAt || null));
};

// Update X days ago every minute
setInterval(() => {
    document.querySelectorAll(".TODO li").forEach(li => {
        const date = li.dataset.created;
        if (date) {
            li.style.setProperty('--before-text', `"Created: ${getDaysAgo(date)}"`);
        }
    });
}, 60000);

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);

document.getElementById("year").textContent = new Date().getFullYear();



/// kto din age todo ta created korea hoyeche seta dekhab...code end..


// // ToDo list added..
// //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////

// const container = document.querySelector(".container");
// const todoForm = container.querySelector(".todoForm");
// const inputTodo = container.querySelector(".todoinput");
// const todoList = container.querySelector(".todoList");
// const message = container.querySelector(".statusMes");

// // show status message
// const showStatusMessage = (text, status) => {
//     message.textContent = text;
//     message.classList.add(`${status}`);
//     setTimeout(() => {
//         message.textContent = "";
//         message.classList.remove(`${status}`);
//     }, 2000);
// };

// // get todos from localStorage
// const getTodosLocal = () => {
//     return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
// };

// // save todos to localStorage
// const saveTodosLocal = (todos) => {
//     localStorage.setItem("mytodos", JSON.stringify(todos));
// };

// // your date format function (used everywhere)
// const getDateFormat = () =>{
//     const today = new Date();
//     const day = today.getDate();
//     const year = today.getFullYear();
//     const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//     const month = monthNames[today.getMonth()];
//     return `${day} ${month}, ${year}`;
// };

// // create todo
// const createTodo = (id, value, done = false, CreatedAt = null ) => {

//     const todoElement = document.createElement("li");
//     todoElement.id = id;
//     todoElement.classList.add("list-style");

//     todoElement.innerHTML = `
//         <span><label><input type="checkbox" class="agree"></label></span>
//         <span class="textValue">${value}</span>
//         <span class="todayDate"></span>
//         <span class="hbtn">
//             <p class="delect"> Delete </p>
//             <button class="todobtn deleteButton"><i class="fa-solid fa-trash"></i></button> 
//         </span>
//     `;

//     // set hover popup date
//     if(!CreatedAt){
//         const temp = getDateFormat();
//         todoElement.style.setProperty('--before-text', `"Created: ${temp}"`);
//     } else {
//         todoElement.dataset.created = CreatedAt;
//         todoElement.style.setProperty('--before-text', `"Created: ${CreatedAt}"`);
//     }

//     const checkbox = todoElement.querySelector(".agree");
//     const text = todoElement.querySelector(".textValue");
//     const deleteButton = todoElement.querySelector(".deleteButton");

//     todoElement.querySelector(".todayDate").innerText = getDateFormat();

//     checkbox.checked = done;
//     text.classList.toggle("done", done);

//     checkbox.addEventListener("change", () => {
//         text.classList.toggle("done", checkbox.checked);
//         const todos = getTodosLocal();
//         const index = todos.findIndex(todo => todo.id === id);
//         if(index !== -1){
//             todos[index].done = checkbox.checked;
//             saveTodosLocal(todos);
//         }
//         renderTodos();
//     });

//     deleteButton.addEventListener("click", () => {
//         if(confirm("Are you sure you want to delete this ToDo?")){
//             let todos = getTodosLocal().filter(todo => todo.id !== id);
//             saveTodosLocal(todos);
//             renderTodos();
//             showStatusMessage("", "");
//         }
//     });

//     todoList.appendChild(todoElement);
// };

// // add todo
// const addTodo = (event) => {
//     event.preventDefault();
//     const todoValue = inputTodo.value.trim();
//     if(todoValue === "") return;

//     const id = Date.now().toString();

//     // created date (no time)
//     const createdAt = getDateFormat();

//     createTodo(id, todoValue, false, createdAt);

//     const todos = getTodosLocal();
//     todos.push({id, todoValue, done:false, CreatedAt: createdAt});
//     saveTodosLocal(todos);

//     renderTodos();
//     showStatusMessage("ToDo is Created", "status");
//     inputTodo.value = "";
// };

// // load todos on page load
// const loadTodos = () => {
//     const todos = getTodosLocal();
//     todos.sort((a,b) => a.done - b.done);
//     todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done, todo.CreatedAt || null));
// };

// const renderTodos = () => {
//     todoList.innerHTML = "";
//     const todos = getTodosLocal();
//     todos.sort((a,b) => a.done - b.done);
//     todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done, todo.CreatedAt || null));
// };

// todoForm.addEventListener("submit", addTodo);
// window.addEventListener("DOMContentLoaded", loadTodos);

// document.getElementById("year").textContent = new Date().getFullYear();
// // ToDo list end


/////////////////////////////
// Calculator code started

const display = document.querySelector('.calculator .display');
let currentValue = "0";
let previousValue = null;
let operator = null;

function updateDisplay(){
    display.innerText = currentValue;
}
const DisplayOperation = (op) =>{
    display.innerText = op;
}
const GetNumber = ( number ) =>{

    if( currentValue.includes(".") && number === "." ) return;

    if( currentValue === "0" && number != "." ){
        currentValue = number;
    }else{
        currentValue += number;
    }

    updateDisplay();
}

const operatorOperation = ( ops ) =>{
    operator = ops;
    previousValue = currentValue;
    currentValue = "0";
    DisplayOperation(ops);
}

function clearAll(){
    currentValue = "0";
    updateDisplay();
}

function clearOne(){
    if( currentValue.length === 1 || (currentValue >= -9 && currentValue <= -1) ){
        currentValue = "0";
    }else{
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

function finalResult(){
    let result;

    if( operator === null || previousValue === null || currentValue === null ){
        currentValue = "Error";
        updateDisplay();
        return;
    }

    let after = parseFloat(currentValue);
    let before = parseFloat(previousValue);

    switch( operator ){
        case "+" :
            result = after + before;
            break;
        case "-":
            result = before - after;
            break;
        case "*":
            result = after * before;
            break;
        case "/":
            if( after === 0 ){
                result = "Error";
            }else{
                result = before / after;
            }
            break;
        case "%":
            result = before % after;
            break;
        default:
            result = "Error";
    }

    currentValue = result.toString();
    FinalDisplay(before, operator, after, result)
    previousValue = null;
    operator = null;
}

function FinalDisplay( a, op, b, res ){
    if( !Number.isInteger(res) ){
        res = res.toFixed(2);
    }
    let result = `${a} ${op} ${b} = ${res}`;
    display.innerText = result;
    updateHistory(result);
}



let history = document.querySelector(".history");

function updateHistory(text) {
    let historyList = document.createElement("li");
    historyList.classList.add("list-style11");
    historyList.innerHTML = `<span>${text}</span>`;
    history.appendChild(historyList);

    saveToSession(text);
}

function saveToSession(text) {
    let oldHistory = JSON.parse(sessionStorage.getItem("calcHistory")) || [];
    oldHistory.push(text);
    sessionStorage.setItem("calcHistory", JSON.stringify(oldHistory));
}

// Optional: load if you want within same session
function loadHistory() {
    let oldHistory = JSON.parse(sessionStorage.getItem("calcHistory")) || [];
    oldHistory.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("list-style11");
        li.innerHTML = `<span>${item}</span>`;
        history.appendChild(li);
    });
}



// Calcultor code end
//////////////////////////////