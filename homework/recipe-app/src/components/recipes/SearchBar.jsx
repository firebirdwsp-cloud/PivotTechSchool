function SearchBar({ searchTerm, setSearchTerm, sortOrder, toggleSort }) {
  function getButtonText() {
    if (sortOrder === "default") {
      return "Sort: Default";
    }

    if (sortOrder === "fastest") {
      return "Sort: Fastest";
    }

    return "Sort: Slowest";
  }

  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search recipes..."
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button className="sort-button" onClick={toggleSort}>
        {getButtonText()}
      </button>
    </div>
  );
}

export default SearchBar;