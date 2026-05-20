const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Allows Express to read JSON from POST requests
app.use(express.json());

// Path to users.json file
const usersFilePath = path.join(__dirname, "users.json");

// Read users from users.json
function readUsers() {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}

// Save users to users.json
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Backend server is running!");
});

// Movies route
app.get("/api/movies", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      title: "Black Panther",
      year: 2018,
    },
    {
      id: 2,
      title: "Spider-Man",
      year: 2002,
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
    },
  ]);
});

// Users route - gets all saved users from users.json
app.get("/api/users", (req, res) => {
  const users = readUsers();

  res.status(200).json(users);
});

// Login POST route - saves username and password to users.json
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const users = readUsers();

  const newUser = {
    id: users.length + 1,
    username: username,
    password: password,
  };

  users.push(newUser);

  saveUsers(users);

  res.status(201).json({
    message: "User saved to users.json",
    user: newUser,
  });
});

// About route
app.get("/api/about", (req, res) => {
  res.status(200).json({
    appName: "Movie App Backend",
    message: "This is a simple Express backend API.",
  });
});

// Catch-all 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});