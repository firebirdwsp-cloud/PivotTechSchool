import { useState } from "react";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  function searchProducts() {
    console.log("Button clicked:", inputValue);
    onSearch(inputValue);
  }

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button onClick={searchProducts}>Search</button>
    </div>
  );
}

export default SearchBar;