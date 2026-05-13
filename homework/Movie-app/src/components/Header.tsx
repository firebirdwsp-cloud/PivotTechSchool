type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Header({ searchTerm, onSearchChange, onSearchSubmit }: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-title">Software Development Movie App</h1>

      <p className="app-subtitle">
        Search movies using The Movie Database API
      </p>

      <form onSubmit={onSearchSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;