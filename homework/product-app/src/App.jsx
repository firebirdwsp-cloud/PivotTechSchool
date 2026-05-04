import { Routes, Route, Link } from "react-router";
import Home from "./screens/Home.jsx";
import Details from "./screens/Details.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;