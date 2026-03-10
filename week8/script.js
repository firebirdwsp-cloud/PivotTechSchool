let clickCount = 0;

const textColors = ["red", "blue", "green", "purple", "orange"];
const bgColors = ["black", "lightblue", "lightgreen", "lavender", "pink"];

function changeColors() {
  const text = document.getElementById("welcome-text");

  text.style.color = textColors[clickCount];
  document.body.style.backgroundColor = bgColors[clickCount];

  clickCount++;

  if (clickCount >= textColors.length) {
    clickCount = 0;
  }
}