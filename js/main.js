

//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todosContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todo");
const dbcounter= document.querySelector('.db');
const textinfo=document.querySelector(".text-info");
const clearall=document.querySelector(".clear__btn");

//event listeners
document.addEventListener("DOMContentLoaded", checkLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
clearall.addEventListener("click", removeAllTodo);

(function date(){
    const nowDate=new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.querySelector('.div__day').textContent=days[nowDate.getDay()];
    const day=[
      nowDate.getDate(),
      nowDate.getMonth()+1,
      nowDate.getFullYear()
      ].map(num => num < 10 ? `0${num}` : num);
      document.querySelector('.div__date').textContent=day.join('-');
}
)();

// checking localstorage todos

function checkLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
        vanpage();
               
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        document.querySelector('.db').textContent=todos.length;
      }

    return todos;
  };
getTodos();

function urespage(){
document.querySelector("#ures").classList.add("div__ures--hide");
textinfo.classList.remove("div__ures--hide");
}
function vanpage(){
document.querySelector("#ures").classList.remove("div__ures--hide");
textinfo.classList.add("div__ures--hide");
return
}



function addTodo(event) {
 
  if (todoInput.value !== "") {
    urespage();
    
    event.preventDefault();
    //to-do div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    if (todoInput.value.toString().length > 23) {
      newTodo.innerHTML = `${todoInput.value.slice(0, 20)}...`;
    } else {
      newTodo.innerText = todoInput.value;
    }
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo localstorage
    saveLocalTodos(todoInput.value);
    //check mark button
    const checkboxInput=document.createElement("input");
    checkboxInput.type="checkbox";
    todoDiv.prepend(checkboxInput);






    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.prepend(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //add to list
    todoList.appendChild(todoDiv);

    // clear input value
    todoInput.value = "";
    todoInput.focus();
    }
    
}




// delete and check fn
function deleteCheck(event) {
  const item = event.target;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => todo.remove());
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    const icon = item.firstChild;
    todo.classList.toggle("checked");
    icon.classList.toggle("fa-square");
    icon.classList.toggle("fa-check-square");
  }
}





// select todos function
function filterTodo(elem) {
  const todos = todoList.childNodes;
  
  todos.forEach(function (todo) {
    switch (elem.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        console.log(todo.classList);
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "going":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}






// saving localstorage items
function saveLocalTodos(todo) {
  let todos = checkLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  document.querySelector('.db').innerHTML=todos.length;
}




// getting localstorage items
function getTodos() {
  let todos = checkLocalTodos();

  if(todos.length>0){
      urespage()
  }else{
      vanpage()
  }

  todos.forEach((todo) => {
    //to-do div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa fa-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.prepend(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //add to list
    todoList.appendChild(todoDiv);
  });
 
}

//removing localstorage todos
function removeLocalTodos(todo) {
  let todos = checkLocalTodos();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  document.querySelector('.db').textContent=todos.length;
  if(todos.length<1){
      vanpage();
  }
}

function removeAllTodo() {
  let todos = checkLocalTodos();
  todos.splice(0);
  localStorage.setItem("todos", JSON.stringify(todos));

  window.location.reload();
 //vanpage();
 
 
}


