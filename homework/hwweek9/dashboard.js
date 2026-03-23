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

    const questions = [
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What color is the sky?", answer: "blue" },
  { question: "How many days are in a week?", answer: "7" },
  { question: "What is 5 + 5?", answer: "10" }
];

let currentQuestionIndex = 0;
let score = 0;
let alreadyAnswered = false;

function loadQuestion() {
  document.getElementById("questionText").textContent =
    questions[currentQuestionIndex].question;
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").textContent = "";
  alreadyAnswered = false;
}

function submitAnswer() {
  if (alreadyAnswered) {
    document.getElementById("feedback").textContent =
      "You already answered this question.";
    return;
  }

  const userAnswer = document
    .getElementById("answerInput")
    .value
    .trim()
    .toLowerCase();

  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === "") {
    document.getElementById("feedback").textContent =
      "Please enter an answer.";
    return;
  }

  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").textContent = "Correct!";
    score++;
    document.getElementById("scoreText").textContent = "Score: " + score;
  } else {
    document.getElementById("feedback").textContent =
      "Wrong! Correct answer: " + questions[currentQuestionIndex].answer;
  }

  alreadyAnswered = true;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }

  loadQuestion();
}

loadQuestion();
}