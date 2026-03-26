let savedName = localStorage.getItem("username");
let savedPassword = localStorage.getItem("password");

console.log(savedName);
console.log(savedPassword);

function saveUser() {
  let name = document.getElementById("nameInput").value;
  let password = document.getElementById("passwordInput").value;

  localStorage.setItem("username", name);
  localStorage.setItem("password", password);

  alert("User saved!");
}