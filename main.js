let tasks = [
    {
        "title" : "دروس جافا سكربت",
        "date"  : "17-08-2022",
        "isDone": false
    },
    {
        "title" : "رياضة",
        "date"  : "17-08-2022",
        "isDone": true
    }
]
function callStorageTask(){
    let retrievedTask =     tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks = retrievedTask ?? []
}
callStorageTask()

function addTasksToList(){

document.getElementById("main-tasks").innerHTML = ""

/* call delete task */
let index = 0
/******/
for (task of tasks){
    let content =`
        <div class="task ${task.isDone ? 'done' : ''}"><!-- 1st task -->
                        <!-- start task name -->
                        <div class="task-name">
                            <h3>${task.title}</h3>
                            <span class="material-symbols-outlined">event_note</span>
                            <span class="date">${task.date}</span>
                        </div><!-- end tasks name -->
                        <!-- start task action -->
                        <div class="task-action">
                            <button onclick="taskDeleted(${index})" class="delete circle">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                            ${task.isDone ? `
                                <button onclick="taskDone(${index})" class="cancel done circle">
                                    <span class="material-symbols-outlined">cancel</span>
                                </button>
                            ` : `
                                <button onclick="taskDone(${index})" class="done circle">
                                    <span class="material-symbols-outlined">check_circle</span>
                                </button>`}
                            <button onclick="taskEdit(${index})" class="edit circle">
                                <span class="material-symbols-outlined">edit_square</span>
                            </button>
                        </div><!-- end tasks action -->
                        </div><!-- end tasks -->
    ` 
document.getElementById("main-tasks").innerHTML += content
index++
}
}
addTasksToList()

document.getElementById("add-task").addEventListener("click", function() {
    let time    = new Date()
    let date    = time.getDate() + "-" + (time.getMonth()+1) + "-" + time.getFullYear() +" || " + time.getHours() + ":" + time.getMinutes()
    let taskName= prompt("أضف مهمة")

    let taskObj = {
        "title" : taskName,
        "date"  : date,
        "isDone": false
    }    
    tasks.push(taskObj)

    storageTask()

    addTasksToList()
})
/* Delete Task */
function taskDeleted(index){
    let task = tasks[index]
    let isSure = confirm("هل ترغب في حذف المهمة؟" + task.title)
    if (isSure){
        tasks.splice(index, 1)
        storageTask()
        addTasksToList()
    }
}
/* Edit Task */
function taskEdit(index){
    let task = tasks[index]
    let editTask = prompt("مالذي ترغب في تعديله؟" , task.title)
        task.title = editTask
        storageTask()
        addTasksToList()
}
/* Finish Task */
function taskDone(index){
    let task = tasks[index] 
    task.isDone =!task.isDone
    storageTask()
    addTasksToList()
}
/** storage */
function storageTask(){
      /* save task in loclhost */
    let taskString = JSON.stringify(tasks)
    localStorage.setItem("tasks",taskString)
    /****/
}