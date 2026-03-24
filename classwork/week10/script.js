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
