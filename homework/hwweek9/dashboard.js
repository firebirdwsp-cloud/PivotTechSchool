let params = new URLSearchParams(window.location.search);
let username = params.get("username");

document.getElementById("welcomeText").textContent = "Welcome, " + username;

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  let li = document.createElement("li");

  let taskText = document.createElement("span");
  taskText.textContent = taskInput.value;
  taskText.classList.add("task-text");

  let buttonBox = document.createElement("div");
  buttonBox.classList.add("task-buttons");

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  completeBtn.onclick = function () {
    li.classList.add("completed");
    completeBtn.disabled = true;
    completeBtn.textContent = "Done";
    updateCompletedCount();
  };

  deleteBtn.onclick = function () {
    li.remove();
    updateCompletedCount();
  };

  buttonBox.appendChild(completeBtn);
  buttonBox.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(buttonBox);

  taskList.appendChild(li);

  taskInput.value = "";
}

function updateCompletedCount() {
  let completedTasks = document.querySelectorAll("#taskList li.completed").length;
  document.getElementById("taskHeading").textContent =
    "Tasks Completed: " + completedTasks;
}