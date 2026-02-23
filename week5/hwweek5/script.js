const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const helloBtn = document.getElementById("helloBtn");
const infoBtn = document.getElementById("infoBtn");
const output = document.getElementById("output");

helloBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name first.");
    return;
  }

  alert(`Hello, ${name}!`);
});

infoBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name && !email) {
    output.textContent = "Please type your name and/or email.";
    return;
  }

  // Build a clean message
  const parts = [];
  if (name) parts.push(`Name: ${name}`);
  if (email) parts.push(`Email: ${email}`);

  output.textContent = parts.join(" • ");
});