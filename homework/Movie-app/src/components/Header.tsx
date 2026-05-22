import type { FormEvent } from "react";
import { Link } from "react-router";

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

function Header({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-top-row">
        <div>
          <h1 className="header-title">Movie App</h1>
          <p className="header-subtitle">Search and save your favorite movies</p>
        </div>

        <Link to="/login" className="login-button">
          Login
        </Link>
      </div>

      <div className="header-search-row">
        <form className="search-form" onSubmit={onSearchSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />

          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;