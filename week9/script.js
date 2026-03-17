function checkLogin() {
  console.log("Submit button clicked");

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  let correctEmail = "admin@email.com";
  let correctPassword = "1234";

  if (email === correctEmail && password === correctPassword) {
    message.textContent = "Login successful!";
    message.style.color = "green";
  } else {
    message.textContent = "Incorrect email or password.";
    message.style.color = "red";
  }
}   

//email is admin@email.com and pw is 1234

