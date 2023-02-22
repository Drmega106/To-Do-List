let container = document.querySelector(".container");
let input = document.querySelector(".taskinput input");
let btn = document.querySelector(".btn");
let tasksbox = document.querySelector(".tasks");
let taskname = "";
let color = document.querySelectorAll(".color span");
let root = document.querySelector(":root");
let alltasks = [];
let notasksdiv = document.querySelector(".notasks");



if (localStorage.color) {
    root.style.setProperty("--main-color", localStorage.color)
};
if (localStorage.btncolor) {
    root.style.setProperty("--btn-color", localStorage.btncolor)
};
if (localStorage.tasks) {
    alltasks = localStorage.tasks.split(",");
    alltasks.forEach(function (ele) {
        addtask(ele);
    })
}else {
    alltasks = [];
    notasksdiv.style.display = "block";
};


color.forEach((span) => {
    span.addEventListener("click", function(e) {
        addcolor(e.currentTarget.dataset.color)
        addbtncolor(e.currentTarget.dataset.btn)
            root.style.setProperty("--main-color", e.currentTarget.dataset.color);
            root.style.setProperty("--btn-color", e.currentTarget.dataset.btn);
    });
});

btn.addEventListener("click", function (){
    if (input.value !== "") {
        if (/,/.test(input.value)) {
           false;
       }else {
        taskname = input.value
        addtask(taskname);
        addToLocal(taskname);
        location.reload(); 
        }
    } else {
        false
    }
});

function addtask(task) {
    let taskdiv = document.createElement("div");
    let deletebtn = document.createElement("btn");
    deletebtn.innerText = "Delete";
    deletebtn.classList.add("delete");
    taskdiv.classList.add("task");
    taskdiv.id = task;
    console.log(taskdiv.id)
    taskdiv.innerText = task;
    taskdiv.appendChild(deletebtn);
    tasksbox.appendChild(taskdiv);
    notasksdiv.style.display = "none";

};


function addToLocal(item) {
    alltasks[alltasks.length] = item;;
    localStorage.tasks = alltasks;
};

function addcolor (color) {
    localStorage.color = color;
}
function addbtncolor (btncolor) {
    localStorage.btncolor = btncolor;
}

let dt = document.querySelectorAll(".delete");
dt.forEach((z) => {
    z.addEventListener("click", function(e) {
        console.log(z.parentElement.id)
        removetask(z.parentElement.id);
        z.parentElement.style.display = "none"
    });
});


function removetask (target) {
    alltasks = alltasks.filter((i) => {
        return i != target;
    })
    localStorage.tasks = alltasks;
};

