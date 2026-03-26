// create a variable with my name
// create another variable with a fake password

let name = "Jon";
let password = "12345";

// local storage is way to save information in the browser, it is a key value pair system
localStorage.setItem("username", name);
localStorage.setItem("password", password);

// to get the information back we can use the getItem method

const nameFromStorage = localStorage.getItem("name");
const passwordFromStorage = localStorage.getItem("password");   
console.log(nameFromStorage);
console.log(passwordFromStorage);

// user will type in their name and password, we will check if it matches the information in local storage
// if they match we will say welcome back, if not we will say please sign up

let userNameInput = prompt("Please enter your username");
let passwordInput = prompt("Please enter your password");

function saveUser() {
  let name = document.getElementById("nameInput").value;
  let password = document.getElementById("passwordInput").value;

  let user = {
    name: name,
    password: password
  };

  localStorage.setItem("userInfo", JSON.stringify(user));

  let savedUser = JSON.parse(localStorage.getItem("userInfo"));
console.log(savedUser.name);
console.log(savedUser.password);
}

// user will type in their name and password
// we will store that in storage
// if they're logged in show text "welcome"
// when the page is refreshed we will check if there is a user in storage, if there is we will show "welcome back" if not we will show "please sign up"
// logout button (clear storage and erase memory of user

function logout() {
  localStorage.removeItem("userInfo");
  alert("You have been logged out.");
}   