import { useNavigate } from "react-router";
// @ts-ignore: PNG import type declaration not available in this project
import taskLogo from "../assets/task-logo.png";
// @ts-ignore: CSS import type declaration not available in this project
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div className="brand-badge">
        <img src={taskLogo} alt="Task Manager Logo" />
        <span>Task Manager</span>
      </div>

      <section className="not-found-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <button onClick={() => navigate("/")}>Back to Login</button>
      </section>
    </main>
  );
}

export default NotFound;