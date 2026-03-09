const nameInput = document.getElementById("nameInput");
const colorInput = document.getElementById("colorInput");
const helloBtn = document.getElementById("helloBtn");
const colorBtn = document.getElementById("colorBtn");

// Say Hello button
helloBtn.addEventListener("click", function () {
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please type your name first.");
  } else {
    alert("Hello, " + name + "!");
  }
});

// Show Color button
colorBtn.addEventListener("click", function () {
  const color = colorInput.value.trim();

  if (color === "") {
    alert("Please type your favorite color first.");
  } else {
    alert("Your favorite color is " + color + "!");
  }
});