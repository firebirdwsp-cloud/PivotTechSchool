import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

type FormMode = "login" | "register";

function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<FormMode>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        mode === "register"
          ? "http://localhost:3000/api/register"
          : "http://localhost:3000/api/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(data.user));

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      if (mode === "register") {
        setMessage("Account created successfully!");
      } else {
        setMessage("Login successful!");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(mode === "login" ? "register" : "login");
    setMessage("");
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>{mode === "login" ? "Login" : "Register"}</h1>

        <p>
          {mode === "login"
            ? "Log in with your test account."
            : "Create a new test account."}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button className="switch-auth-button" type="button" onClick={switchMode}>
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}

export default Login;