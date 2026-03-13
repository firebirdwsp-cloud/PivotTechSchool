const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const scoreBox = document.getElementById("scoreBox");

const answers = {
  q1: "Paris",
  q2: "15",
  q3: "HyperText Markup Language",
  q4: "Styling a webpage",
  q5: "Adding interactivity"
};

submitBtn.addEventListener("click", function () {
  let right = 0;
  let wrong = 0;

  for (let key in answers) {
    const selectedOption = document.querySelector(`input[name="${key}"]:checked`);

    if (selectedOption && selectedOption.value === answers[key]) {
      right++;
    } else {
      wrong++;
    }
  }

  scoreBox.textContent = `Right: ${right} | Wrong: ${wrong}`;
});

resetBtn.addEventListener("click", function () {
  scoreBox.textContent = "Right: 0 | Wrong: 0";
});