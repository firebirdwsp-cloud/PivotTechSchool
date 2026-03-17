function checkLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  let correctUsername = "admin";
  let correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    message.textContent = "Login successful!";
    message.style.color = "green";
  } else {
    message.textContent = "Incorrect username or password.";
    message.style.color = "red";
  }

  function checkLogin() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  console.log("Submit button was clicked");
  console.log("Username entered:", username);
  console.log("Password entered:", password);

  let correctUsername = "admin";
  let correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    message.textContent = "Login successful!";
    message.style.color = "green";
    console.log("Login successful");
  } else {
    message.textContent = "Incorrect username or password.";
    message.style.color = "red";
    console.log("Login failed");
  }
console.log("username:", username);
console.log("password:", password); 



   
}
}