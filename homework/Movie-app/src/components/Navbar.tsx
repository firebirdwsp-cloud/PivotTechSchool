import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;