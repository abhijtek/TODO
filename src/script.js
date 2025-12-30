document.addEventListener("DOMContentLoaded",()=>{
    
const addTask = document.getElementById("add-task-btn")
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => loadTask(task));


addTask.addEventListener("click",(event)=>{
let taskText = todoInput.value.trim();
if(taskText === "")return ;
else console.log(taskText);
const newTask =  {
    id: Date.now(),
    text : taskText,
    isCompleted: false
}
tasks.push(newTask);
saveTask();
todoInput.value = "";
loadTask(newTask);

});

function loadTask(task){
 const li = document.createElement("li");
 li.setAttribute('data-id',task.id)
 li.innerHTML = `<div class = "flex justify-between bg-gray-300 flex-wrap p-1.5 m-0.5 rounded-sm w-72"><div>${task.text}</div>  <button class = "bg-red-500 text-gray-950 p-1 rounded-sm">Delete</button></div>`
 li.addEventListener("click",(event)=>{
    if(event.target.tagName === "BUTTON"){
     return;   
    }
    if(task.isCompleted)task.isCompleted = false;
    else task.isCompleted = true;
    li.classList.toggle("completed");
    saveTask();
 }) 
 li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation();
    tasks = tasks.filter(t=>
        t.id !== task.id
    )
     console.log(tasks);
    saveTask();
    li.remove();
   
    
    
 })
  todoList.appendChild(li);

}

function saveTask(){
    // add to local storage
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
})