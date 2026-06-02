const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Temporary fake database
// These reset whenever the backend restarts
const users = [];
const tasks = [];

// Test route
app.get("/", (req, res) => {
  res.send("Task App Backend is running");
});

// Register route
app.post("/register", async (req, res) => {
  console.log("Register request received:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Register error:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// Login route
app.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// Get tasks for one user
app.get("/tasks", (req, res) => {
  const { email } = req.query;

  console.log("Get tasks request for:", email);

  if (!email) {
    return res.status(400).json({
      message: "User email is required",
    });
  }

  const userTasks = tasks.filter((task) => task.userEmail === email);

  res.status(200).json({
    message: "Tasks loaded successfully",
    tasks: userTasks,
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  console.log("Add task request received:", req.body);

  const { title, userEmail } = req.body;

  if (!title || !userEmail) {
    return res.status(400).json({
      message: "Task title and user email are required",
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    status: "todo",
    userEmail,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    task: newTask,
  });
});

// Update a task status
app.put("/tasks/:id", (req, res) => {
  console.log("Update task request received:", req.params, req.body);

  const taskId = Number(req.params.id);
  const { status, userEmail } = req.body;

  if (!status || !userEmail) {
    return res.status(400).json({
      message: "Status and user email are required",
    });
  }

  const task = tasks.find(
    (task) => task.id === taskId && task.userEmail === userEmail
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.status = status;

  res.status(200).json({
    message: "Task updated successfully",
    task,
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  console.log("Delete task request received:", req.params, req.body);

  const taskId = Number(req.params.id);
  const { userEmail } = req.body;

  if (!userEmail) {
    return res.status(400).json({
      message: "User email is required",
    });
  }

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.userEmail === userEmail
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});