import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Tasks.css";

type TaskStatus = "todo" | "doing" | "done";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  userEmail: string;
};

type TasksResponse = {
  message: string;
  tasks?: Task[];
  task?: Task;
};

const API_URL = "http://localhost:5000";

function Tasks() {
  const navigate = useNavigate();

  const [taskText, setTaskText] = useState<string>("");
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [userEmail, setUserEmail] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskError, setTaskError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("taskAppCurrentUser");

    if (!currentUser) {
      navigate("/");
      return;
    }

    setUserEmail(currentUser);
    loadTasks(currentUser);
  }, [navigate]);

  async function loadTasks(email: string) {
    try {
      setIsLoading(true);
      setTaskError("");

      const response = await fetch(
        `${API_URL}/tasks?email=${encodeURIComponent(email)}`
      );

      const data: TasksResponse = await response.json();

      if (!response.ok) {
        setTaskError(data.message || "Could not load tasks.");
        return;
      }

      setTasks(data.tasks || []);
    } catch {
      setTaskError("Could not connect to the backend server.");
    } finally {
      setIsLoading(false);
    }
  }

  async function addTask() {
    if (taskText.trim() === "") {
      setTaskError("Please enter a task before adding.");
      return;
    }

    try {
      setTaskError("");

      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskText.trim(),
          userEmail: userEmail,
        }),
      });

      const data: TasksResponse = await response.json();

      if (!response.ok) {
        setTaskError(data.message || "Could not add task.");
        return;
      }

      if (data.task) {
        setTasks([...tasks, data.task]);
      }

      setTaskText("");
    } catch {
      setTaskError("Could not connect to the backend server.");
    }
  }

  async function changeTaskStatus(id: number, newStatus: TaskStatus) {
    try {
      setTaskError("");

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          userEmail: userEmail,
        }),
      });

      const data: TasksResponse = await response.json();

      if (!response.ok) {
        setTaskError(data.message || "Could not update task.");
        return;
      }

      if (data.task) {
        setTasks(
          tasks.map((task) => (task.id === id ? data.task as Task : task))
        );
      }
    } catch {
      setTaskError("Could not connect to the backend server.");
    }
  }

  async function deleteTask(id: number) {
    try {
      setTaskError("");

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userEmail,
        }),
      });

      const data: TasksResponse = await response.json();

      if (!response.ok) {
        setTaskError(data.message || "Could not delete task.");
        return;
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch {
      setTaskError("Could not connect to the backend server.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("taskAppCurrentUser");
    navigate("/");
  }

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <main className="tasks-page">
      <section className="tasks-container">
        <header className="tasks-header">
          <div className="task-title-area">
            <img src="/task-logo.png" alt="Task Manager Logo" />

            <div>
              <h1>Task Manager</h1>
              <p>Plan. Track. Finish.</p>
            </div>
          </div>

          <div className="user-area">
            <p>Hello, {userEmail}</p>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="add-task-area">
          <form
            className="add-task-form"
            onSubmit={(event) => {
              event.preventDefault();
              addTask();
            }}
          >
            <input
              type="text"
              placeholder="Add task..."
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
            />

            <button type="submit">Add Task</button>
          </form>
        </section>

        {taskError && <p className="task-error">{taskError}</p>}

        <section className="filter-buttons">
          <button type="button" onClick={() => setFilter("all")}>
            All
          </button>

          <button type="button" onClick={() => setFilter("todo")}>
            Todo
          </button>

          <button type="button" onClick={() => setFilter("doing")}>
            Doing
          </button>

          <button type="button" onClick={() => setFilter("done")}>
            Done
          </button>
        </section>

        <section className="task-list">
          {isLoading ? (
            <p className="task-message">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="task-message">No tasks found. Add one above.</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div className="task-icon">{task.status}</div>

                <p>{task.title}</p>

                <select
                  value={task.status}
                  onChange={(event) =>
                    changeTaskStatus(task.id, event.target.value as TaskStatus)
                  }
                >
                  <option value="todo">Todo</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>

                <button
                  className="trash-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                >
                  Trash
                </button>
              </div>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default Tasks;