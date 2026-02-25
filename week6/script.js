function loginHandler() {
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;

  alert("Welcome " + name + " (" + email + ")");
}

function changeText() {
  document.getElementById("change-text").textContent =
    "The text has been changed!";
}

function changeColor() {
  document.getElementById("change-text").style.color = "red";
}