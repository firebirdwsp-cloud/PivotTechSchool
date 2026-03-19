const nameInput = document.getElementById("nameInput");
const colorInput = document.getElementById("colorInput");
const helloBtn = document.getElementById("helloBtn");
const colorBtn = document.getElementById("colorBtn");

const leftPanel = document.querySelector(".left-panel");
const footerText = document.querySelector(".footer-text");

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
    return;
  }

  const testColor = new Option().style;
  testColor.color = color;

  if (testColor.color === "") {
    alert("That is not a valid color. Try red, blue, green, or a hex code like #ff0000.");
    return;
  }

  leftPanel.style.backgroundColor = color;
  footerText.textContent = "Favorite color selected: " + color;
});