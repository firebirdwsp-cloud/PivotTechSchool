// integers (numbers)
console.log(145890 + 2312131); // add
console.log(145890 - 2312131); // subtract
console.log(145890 / 2312131); // divide
console.log(145890 * 2312131); // multiply
// string (human words) & variables
let name = "Leo R";
let age = "35";
let food = "Pizza";

console.log("my name is " + name + " and I am " + age +
    " years old." + " and i love to eat " + food + ".");
;

//functions

function sayHello() {


    console.log("hello");
    console.log("hello");
    console.log("hello");
}
sayHello();

function addNumbers(a, b) {
    console.log(a + b);

}
addNumbers(2, 3);
addNumbers(11, 4);
addNumbers(6, 1);

function deleteNumbers(a, b) {
    console.log(a - b);
}
deleteNumbers(6, 8);
deleteNumbers(9, 2);
deleteNumbers(84, 56);

function multiplyNumbers(a, b) {
    console.log(a * b);
}
multiplyNumbers(6, 8);
multiplyNumbers(9, 2);
multiplyNumbers(84, 56);
function divideNumbers(a, b) {
    console.log(a / b);
}
divideNumbers(6, 8);
divideNumbers(9, 2);
divideNumbers(84, 56);

let favColor = "pink";
favColor = "blue";
console.log(favColor);
favColor = "green";

let score = 10
const color = "red";
score = 15;
console.log(score);

function submitName() {
    const nameValue = document.getElementById("name").value;
    alert("Name: " + nameValue);
}

function submitEmail() {
    const emailValue = document.getElementById("email").value;
    alert("Email: " + emailValue);
}


const myName = "Adam";
alert(`${myName}.com`);

const myEmail = myName + "@gmail.com";
alert(myEmail);


