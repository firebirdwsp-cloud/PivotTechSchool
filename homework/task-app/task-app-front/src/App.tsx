import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/Notfound.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tasks" element={<Tasks />} />

      {/* 404 page for any route that does not exist */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;