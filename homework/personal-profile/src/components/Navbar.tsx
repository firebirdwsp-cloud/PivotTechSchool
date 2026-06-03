import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={logo} alt="Light in Progress Studios logo" className="nav-logo" />
      </div>

      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;