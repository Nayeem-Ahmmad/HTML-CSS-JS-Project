// html element finding
const container = document.querySelector(".container");
const todoForm = container.querySelector(".todoForm");
const inputTodo = container.querySelector(".todoinput");
const todoList = container.querySelector(".todoList");
const important = container.querySelector(".important"); // Important ul
const message = container.querySelector(".statusMes");
const list = document.querySelector(".listTodoDivider");

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

// create todo element
const createTodo = (todo, isNew = false) => {
    const todoElement = document.createElement("li");
    todoElement.id = todo.id;
    todoElement.classList.add("list-style");

    todoElement.innerHTML = `
        <span>
            <label>
                <input type="checkbox" class="agree">
            </label>
        </span>
        <span class="textValue">${todo.todoValue}</span>
        
        <span class="hbtn">
            <button class="todobtn deleteButton"> 
                <i class="fa-solid fa-trash"></i>
            </button> 
        </span>
    `;

    const checkbox = todoElement.querySelector(".agree");
    const text = todoElement.querySelector(".textValue");
    const deleteButton = todoElement.querySelector(".deleteButton");

    // set initial state
    checkbox.checked = todo.done;

    //////////////////////////////////////////////
    // this line text line through kore..
    //text.classList.toggle("done", todo.done);

    // checkbox change event
    checkbox.addEventListener("change", () => {
        const todos = getTodosLocal();
        const index = todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
            todos[index].done = checkbox.checked;
            saveTodosLocal(todos);
        }
        formatedTodo();
        //renderTodos();
    });

    // delete todo
    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this ToDo?")) {
            let todos = getTodosLocal();
            todos = todos.filter(t => t.id !== todo.id);
            saveTodosLocal(todos);
            formatedTodo();
            //renderTodos();
            showStatusMessage("ToDo deleted", "danger");
        }
    });

    return todoElement;
};

// render todos
const formatedTodo = () => {
    todoList.innerHTML = "";
    important.innerHTML = "";

    const todos = getTodosLocal();
    const doneItems = getDoneItems(); // ✅ get saved newItems
    todos.sort((a, b) => a.done - b.done);
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done));
    todos.forEach(todo => {
        const li = createTodo(todo, false); // isNew = false during render

        // ✅ restore newItems line-through on textValue
        const textSpan = li.querySelector(".textValue");
        if (doneItems.includes(todo.id)) {
            textSpan.classList.add("newItems");
        }

        if (todo.done) {
            important.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });
};


// add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = inputTodo.value.trim();
    if (todoValue === "") return;

    const id = Date.now().toString();
    const todos = getTodosLocal();
    const newTodo = { id, todoValue, done: false };
    todos.push(newTodo);
    saveTodosLocal(todos);
    renderTodos();
    // add newly created todo with New label
    const li = createTodo(newTodo, true);
    todoList.appendChild(li);

    showStatusMessage("ToDo is Created", "status");
    inputTodo.value = "";
};

document.getElementById("year").textContent = new Date().getFullYear();
// load todos on page load

// new feature add started
///////////////////////////

const renderTodos = () => {
    todoList.innerHTML = "";
    const todos = getTodosLocal();
    // sort: done=false first, done=true later
    todos.sort((a, b) => a.done - b.done);
    todos.forEach(todo => createTodo(todo.id, todo.todoValue, todo.done));
};

// --- get/save newItems from localStorage ---
const getDoneItems = () => {
    return localStorage.getItem("doneItems") ? JSON.parse(localStorage.getItem("doneItems")) : [];
}

const saveDoneItems = (items) => {
    localStorage.setItem("doneItems", JSON.stringify(items));
}

// restore newItems on page load
window.addEventListener("DOMContentLoaded", () => {
    const doneItems = getDoneItems();

    // listTodoDivider এর ভিতরের সব li ধরে loop
    document.querySelectorAll(".listTodoDivider li").forEach(li => {
        const textSpan = li.querySelector(".textValue");
        if (doneItems.includes(li.id)) {
            textSpan.classList.add("newItems"); // ✅ text span এ add
        }
    });
});

// handle click for all li's inside listTodoDivider
list.addEventListener("click", (event) => {
    const textSpan = event.target.closest(".textValue"); // ✅ শুধুমাত্র textValue span
    if (!textSpan) return;

    const li = textSpan.closest("li");
    const id = li.id;
    let doneItems = getDoneItems();

    textSpan.classList.toggle("newItems"); // ✅ toggle only on textValue

    if (textSpan.classList.contains("newItems")) {
        if (!doneItems.includes(id)) doneItems.push(id);
    } else {
        doneItems = doneItems.filter(item => item !== id);
    }

    saveDoneItems(doneItems);
});


///////////////////////////
// new feature add ended

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", formatedTodo);
