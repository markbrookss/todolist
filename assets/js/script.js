// Create Element
let div = document.createElement("div");
let input = document.createElement("input");
//
let tasksDiv = document.querySelector(".tasks");
let taskInput = document.querySelector("#task-input");
let submit = document.querySelector("#add-btn");
let container = document.querySelector(".container");
// Array of tasks
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();
//
submit.addEventListener("click", () => {
  if (taskInput.value !== "") {
    addTaskToArray(taskInput.value);
    taskInput.value = "";
  }
});
//
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push to array of tasks
  arrayOfTasks.push(task);
  //add task to page from array of tasks
  addElementsToPage(arrayOfTasks);
  //add tasks to local Storage
  addTaskToLocalStorage(arrayOfTasks);
}
//
//
// function to add Elements To Page
function addElementsToPage(arrayOfTasks) {
  //Empty Tasks Div
  tasksDiv.innerHTML = "";
  //   loop on array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Div For content Task
    let taskDiv = div.cloneNode(false);
    taskDiv.className = "task";
    taskDiv.setAttribute("data-id", task.id);
    if (task.completed) {
      taskDiv.classList.add("done");
    }
    // create Element node
    let inputText = input.cloneNode(false);
    let inputEdit = input.cloneNode(false);
    let inputDelete = input.cloneNode(false);
    // Assign Attribute To Element
    Object.assign(inputText, {
      type: "text",
      readOnly: true,
    });
    if (task.completed) {
      inputText.classList.add("done");
    }
    Object.assign(inputEdit, {
      type: "button",
      className: "edit",
      id: "edit",
      value: "EDIT",
    });
    Object.assign(inputDelete, {
      type: "button",
      className: "delete",
      id: "delete",
      value: "DELETE",
    });
    //
    inputText.value = task.title;
    taskDiv.appendChild(inputText);
    taskDiv.appendChild(inputEdit);
    taskDiv.appendChild(inputDelete);
    tasksDiv.appendChild(taskDiv);
  });
}
function addTaskToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    // console.log("edit");
    editTask(e.target.parentElement.firstChild);
  } else if (e.target.classList.contains("delete")) {
    //remove element from local storage
    removeTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    //remove element from page
    e.target.parentElement.remove();
  } else {
    // toggle status task in array of task and update localStorage
    toggleStatusTask(e.target.parentElement.getAttribute("data-id"));
    // add class style to div task
    e.target.classList.toggle("done");
  }
});
//function remove element from local storage
function removeTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  // update localStorage
  addTaskToLocalStorage(arrayOfTasks);
}
// function toggle status task in array of task and update localStorage
function toggleStatusTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addTaskToLocalStorage(arrayOfTasks);
}

function editTask(firstChildInput) {
  if (firstChildInput.nextElementSibling.value === "EDIT") {
    // remove Attribute readonly and focus on input task
    firstChildInput.removeAttribute("readonly");
    firstChildInput.focus();
    // change button value to SAVE
    firstChildInput.nextElementSibling.value = "SAVE";
  } else if (firstChildInput.nextElementSibling.value === "SAVE") {
    // assign Attribute to element
    Object.assign(firstChildInput, {
      type: "text",
      readOnly: true,
    });
    // loop on array of tasks to edit Title
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (
        arrayOfTasks[i].id ==
        firstChildInput.parentElement.getAttribute("data-id")
      ) {
        arrayOfTasks[i].title = firstChildInput.value;
      }
    }
    // update localStorage
    addTaskToLocalStorage(arrayOfTasks);
    // change button value to EDIT
    firstChildInput.nextElementSibling.value = "EDIT";
  }

  // if (firstChildInput.nextElementSibling.value === "EDIT") {
  //   firstChildInput.removeAttribute("readonly");
  //   firstChildInput.focus();
  //   firstChildInput.nextElementSibling.value = "SAVE";
  // } else if (firstChildInput.nextElementSibling.value === "SAVE") {
  //   firstChildInput.removeAttribute("readonly");
  //   firstChildInput.nextElementSibling.value = "EDIT";

  // }

  // console.log();
}
