let character = {
  name: "Jon",
  age: 41,
  role: "Warrior",
    hp: 100,
  attack: 25,
  defense: 15
};

function showCharacterInfo() {
  console.log(`My name is ${character.name} and I have ${character.hp} health`);
}

showCharacterInfo();

document.getElementById("output").innerHTML =
  "Name: " + character.name + "<br>" +
  "Age: " + character.age + "<br>" +
  "Role: " + character.role + "<br>" +
  "HP: " + character.hp + "<br>" +
  "Attack: " + character.attack + "<br>" +
  "Defense: " + character.defense;


document.getElementById("output").innerHTML =
  "Name: " + character.name + "<br>" +
  "Age: " + character.age + "<br>" +
  "Role: " + character.role;