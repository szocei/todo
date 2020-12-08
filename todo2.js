checkTodos();
//date
(function date(){
    const nowDate=new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.querySelector('.div__day').textContent=days[nowDate.getDay()];
    document.querySelector('.div__date').textContent=`${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`;
}
)();

function checkTodos() {
  let dataInLocalStorage = localStorage.getItem("todos");
   
  if (dataInLocalStorage == null) {
    todos = [];
    document.querySelector('.db').innerHTML='0';
  } else {
    todos = JSON.parse(dataInLocalStorage);
  }
  let html = "";
  todos.forEach((todo, index) => {
    html += `<section class='sect'><input type='checkbox' name='check' id='check'><div class='card'><div class='deldiv' onclick='removeTodo(${index});'>X</div>${todo}</div></section>`;
  });
  $(".incomplete").empty().append(html);
  document.querySelector('.db').innerHTML=todos.length;
};


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
    }
};

  let removeTodo = (index) => {
    let todosData = localStorage.getItem("todos");
    todos = JSON.parse(todosData);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    checkTodos();
  };

