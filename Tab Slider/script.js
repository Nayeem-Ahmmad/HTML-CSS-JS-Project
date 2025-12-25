
//In the name of allah

const { createElement } = require("react");

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


// ToDo list added..
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// html element finding
const container = document.querySelector(".container");
const todoForm = container.querySelector(".todoForm");
const inputTodo = container.querySelector(".todoinput");
const todoList = container.querySelector(".todoList");
const message = container.querySelector(".statusMes");

// show status message
const showStatusMessage = (text, status) => {
    message.textContent = text;
    message.classList.add(`${status}`);
    setTimeout(() => {
        message.textContent = "";
        message.classList.remove(`${status}`);
    }, 2000);
};

// get todos from localStorage
const getTodosLocal = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : [];
};

// save todos to localStorage
const saveTodosLocal = (todos) => {
    localStorage.setItem("mytodos", JSON.stringify(todos));
};
//get today date formatted

const getDateFormat = () =>{
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    const month = monthNames[today.getMonth()];
    return `${day} ${month}, ${year}`;
}
// create todo
const createTodo = (id, value, done = false) => {


    const todoElement = document.createElement("li");
    todoElement.id = id;
    todoElement.classList.add("list-style");

    todoElement.innerHTML = `
        <span>
            <label>
                <input type="checkbox" class="agree">
            </label>
        </span>

        <span class="textValue">${value}</span>
       <span class = "todayDate"></span>
        <span class="hbtn">
            <p class="delect"> Delete </p>
            <button class="todobtn deleteButton"> 
                <i class="fa-solid fa-trash"></i>
            </button> 
        </span>
    `;

    // get elements inside this todo
    const hover = todoElement.querySelector(".hvr");
    const checkbox = todoElement.querySelector(".agree");
    const text = todoElement.querySelector(".textValue");
    const deleteButton = todoElement.querySelector(".deleteButton");

    todoElement.querySelector(".todayDate").innerText = getDateFormat();
    // const today = getDateFormat();
    // console.log(today);
    // showDate.innerContext = today;

    // set initial checkbox state & line-through
    checkbox.checked = done;
    text.classList.toggle("done", done);

    // checkbox change event
    checkbox.addEventListener("change", () => {
        text.classList.toggle("done", checkbox.checked);

        // update localStorage
        const todos = getTodosLocal();
        const index = todos.findIndex(todo => todo.id === id);
        if(index !== -1){
            todos[index].done = checkbox.checked;
            saveTodosLocal(todos);
        }
        renderTodos();
        renderTodos();
    });

    // delete todo
    deleteButton.addEventListener("click", () => {
         if( confirm("Are you sure you want to delete this ToDo?") ){
            todoElement.remove();
            // remove from localStorage
            let todos = getTodosLocal();
            todos = todos.filter(todo => todo.id !== id);
            saveTodosLocal(todos);
            renderTodos();
            showStatusMessage("", "");
        }else{
            return;
        }
    });

    todoList.appendChild(todoElement);
    
};

// add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = inputTodo.value.trim();
    if(todoValue === "") return;

    const id = Date.now().toString();

    // create todo
    createTodo(id, todoValue);

    // add to localStorage
    const todos = getTodosLocal();
    todos.push({id, todoValue, done: false});
    saveTodosLocal(todos);

    renderTodos();
    showStatusMessage("ToDo is Created", "status");
    inputTodo.value = "";
};

// load todos on page load
const loadTodos = () => {
    const todos = getTodosLocal();
    todos.sort((a, b) =>{
        return ( b.done === false ) - ( a.done === false );
    })
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done));
};

const renderTodos = () => {
    todoList.innerHTML = "";
    const todos = getTodosLocal();
    // sort: done=false first, done=true later
    todos.sort((a, b) => a.done - b.done);
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done));
};

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);

document.getElementById("year").textContent = new Date().getFullYear();
// ToDo list end

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
}

//function history_update(){
//     let historyList = document.createElement("li");
//     historyList.classList.add("list-style");
    
//     historyList.innerHTML = `
//         <span class = "list-style"> hello </span>
//     `;
    
//     history.appendChild(historyList);
// }
// history_update();
// Calcultor code end
//////////////////////////////