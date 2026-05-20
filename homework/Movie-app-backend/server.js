const express = require("express");

const app = express();
const PORT = 3000;

// Allows Express to read JSON data from POST requests
app.use(express.json());

// Fake storage for practice
let users = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
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

// Users route
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// About route
app.get("/api/about", (req, res) => {
  res.status(200).json({
    appName: "Movie App Backend",
    message: "This is a simple Express backend API.",
  });
});

// Login POST route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const newUser = {
    id: users.length + 1,
    username: username,
    password: password,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User login info saved",
    user: newUser,
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