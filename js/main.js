checkTodos();
//date
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

function checkTodos() {
  let dataInLocalStorage = localStorage.getItem("todos");
  if (dataInLocalStorage == null) {
            todos = [];
          } else {
    todos = JSON.parse(dataInLocalStorage);
   
      }
  let html = "";
  todos.forEach((todo, index) => {
    html += `<div class='div__todo'><input type='checkbox' name='check' id='check'><div class='card'><div class='deldiv' onclick='removeTodo(${index});'><i class='fa fa-trash'></i></div>${todo}</div></div>`;
  });
  $(".incomplete").empty().append(html);
  document.querySelector('.db').innerHTML=todos.length;
  if(todos.length<1){
    urespage()
  }else{
    telipage()
  }
  
};

function telipage(){
  let ures=document.querySelector('#ures');
  ures.classList.add('div__ures--hide');
  document.querySelector('.text-info').classList.remove('div__ures--hide');
  }
//urespage();
function urespage(){
  let ures=document.querySelector('#ures');
  ures.classList.remove('div__ures--hide');
  document.querySelector('.text-info').classList.add('div__ures--hide');
}

function letrehoz (){
    if ($("input").val() !== "") {
        todo = $("input").val();
      let todosData = localStorage.getItem("todos");
      if (todosData == null) {
        todos = [];
      } else {
        todos = JSON.parse(todosData);
      }
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      $("input").val("");
      
      checkTodos();
      telipage();
    }
};

  let removeTodo = (index) => {
    let todosData = localStorage.getItem("todos");
    todos = JSON.parse(todosData);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    checkTodos();
  };
  let removeAllTodo = () => {
    let todosData = localStorage.getItem("todos");
    todos = JSON.parse(todosData);
    todos.splice(0);
    localStorage.setItem("todos", JSON.stringify(todos));
    checkTodos();
    document.querySelector('#todo').focus();
  };
  
  
