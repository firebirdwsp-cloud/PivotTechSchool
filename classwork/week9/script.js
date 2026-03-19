function checkLogin() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let message = document.getElementById("message");

  if (
    email.length >= 3 &&
    email.length <= 20 &&
    password.length >= 3 &&
    password.length <= 20
  ) {
    message.textContent = "Login successful!";
    message.style.color = "green";

    window.location.assign("./profile.html");
  } else {
    message.textContent =
      "Email and password must both be between 3 and 20 characters.";
    message.style.color = "red";
  }
}
// changed so any email can be used instead of a username, 
// and added a message to show if the login was successful or not   