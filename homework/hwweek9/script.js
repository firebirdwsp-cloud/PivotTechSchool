function startApp() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  let correctUsername = "Adam";
  let correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    message.textContent = "Login successful!";
    window.location.href = "dashboard.html?username=" + encodeURIComponent(username);
  } else {
    message.textContent = "Incorrect username or password.";
  }
}