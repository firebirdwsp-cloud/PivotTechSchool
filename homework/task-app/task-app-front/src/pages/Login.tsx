import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

type BackendUser = {
  id: number;
  email: string;
};

type BackendResponse = {
  message: string;
  user?: BackendUser;
};

const API_URL = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleRegister() {
    clearMessages();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data: BackendResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setSuccess("Account created! You can now login.");
      setIsRegistering(false);
      clearInputs();
    } catch {
      setError("Could not connect to the backend server.");
    }
  }

  async function handleLogin() {
    clearMessages();

    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data: BackendResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      if (data.user) {
        localStorage.setItem("taskAppCurrentUser", data.user.email);
        navigate("/tasks");
      }
    } catch {
      setError("Could not connect to the backend server.");
    }
  }

  function handleSubmit() {
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  return (
    <main className="login-page">
      <div className="brand-badge">
        <img src="/task-logo.png" alt="Task Manager Logo" />
        <span>Task Manager</span>
      </div>

      <div className="login-card">
        <h1>{isRegistering ? "Create Account" : "Welcome Back"}</h1>

        <p className="login-subtitle">
          {isRegistering
            ? "Register to start managing your tasks"
            : "Login to manage your tasks"}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password..."
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          )}

          <button className="submit-button" type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>

          <p className="register-text">
            {isRegistering ? "Already have an account?" : "Need account?"}{" "}
            <button
              className="register-link"
              type="button"
              onClick={() => {
                clearMessages();
                clearInputs();
                setIsRegistering(!isRegistering);
              }}
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;