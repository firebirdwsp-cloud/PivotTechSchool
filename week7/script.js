// let age = 16;

// if (age >= 18) {
//   alert("You are an adult.");
// } else {
//   alert("You are under 18.");
// }

let testpassword = "password123";

if (testpassword === "password123") {
  alert("You have entered the correct password.");
} else {
  alert("You have entered the wrong password.");
}   

function login() {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;

  // Hardcoded login info (for learning only)
  const correctUsername = "admin";
  const correctPassword = "1234";

  if (username === correctUsername && password === correctPassword) {
    alert("Login successful!");
  } else {
    alert("Incorrect username or password.");
  }
}

