const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Path to users.json
const usersFilePath = path.join(__dirname, "users.json");

// Read users from users.json
function readUsers() {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
  }

  const data = fs.readFileSync(usersFilePath, "utf-8");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

// Save users to users.json
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Fake movie data
const movies = [
  {
    id: 1,
    title: "Black Panther",
    poster_path: "/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    release_date: "2018-02-16",
    vote_average: 8.3,
    overview: "T'Challa returns home to Wakanda to take his place as king.",
  },
  {
    id: 2,
    title: "Spider-Man",
    poster_path: "/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg",
    release_date: "2002-05-03",
    vote_average: 7.4,
    overview:
      "Peter Parker becomes Spider-Man after being bitten by a genetically altered spider.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    overview: "Batman faces the Joker in Gotham City.",
  },
  {
    id: 4,
    title: "Avatar",
    poster_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    release_date: "2009-12-18",
    vote_average: 7.6,
    overview:
      "A paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
  },
];

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Movie backend is running!");
});

// Popular movies route
app.get("/api/movies/popular", (req, res) => {
  res.status(200).json(movies);
});

// Now playing movies route
app.get("/api/movies/now-playing", (req, res) => {
  res.status(200).json(movies);
});

// Search movies route
app.get("/api/movies/search", (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(filteredMovies);
});

// Movie details route
// Keep this AFTER /popular, /now-playing, and /search
app.get("/api/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);

  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  res.status(200).json(movie);
});

// Get all users
app.get("/api/users", (req, res) => {
  const users = readUsers();

  res.status(200).json(users);
});

// Register new user
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const users = readUsers();

  const userAlreadyExists = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (userAlreadyExists) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
});

// Login existing user
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  const users = readUsers();

  const foundUser = users.find(
    (user) =>
      user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password
  );

  if (!foundUser) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  res.status(200).json({
    message: "Login successful",
    user: foundUser,
  });
});

// 404 route - keep this LAST
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    routeTried: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});