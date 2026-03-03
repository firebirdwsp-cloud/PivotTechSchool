// CONFIRM JS IS CONNECTED
console.log("JavaScript is connected");

/* =========================
   LOGIN (placeholder)
========================= */
function loginHandler() {
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;

  if (name === "" || email === "") {
    alert("Please enter name and email");
    return;
  }

  alert("Welcome, " + name + "!");
}

/* =========================
   CHANGE TEXT
========================= */
function changeText() {
  document.getElementById("change-text").textContent =
    "Text has been changed!";
}

/* =========================
   CHANGE COLOR
========================= */
function changeColor() {
  const text = document.getElementById("change-text");
  text.style.color = "green";
}

/* =========================
   TO-DO APP
========================= */
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.className = "li-item";

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.onclick = function () {
    taskList.removeChild(li);
  };

  // Build list item
  li.appendChild(span);
  li.appendChild(deleteBtn);

  // Add to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
}