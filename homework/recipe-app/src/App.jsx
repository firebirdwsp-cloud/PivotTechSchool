import "./App.css";
import { useState } from "react";
import recipes from "./data/recipes.jsx";
import Counter from "./components/recipes/Counter.jsx";
import FavoritesSection from "./components/favorites/FavoritesSection.jsx";
import SearchBar from "./components/recipes/SearchBar.jsx";
import RecipeList from "./components/recipes/RecipeList.jsx";
import TopRecipes from "./components/recipes/TopRecipes.jsx";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  function toggleFavorite(recipeId) {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter((id) => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
  }

  function clearFavorites() {
    setFavorites([]);
  }

  function toggleSort() {
    if (sortOrder === "default") {
      setSortOrder("fastest");
    } else if (sortOrder === "fastest") {
      setSortOrder("slowest");
    } else {
      setSortOrder("default");
    }
  }

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortOrder === "fastest") {
      return a.time - b.time;
    }

    if (sortOrder === "slowest") {
      return b.time - a.time;
    }

    return 0;
  });

  return (
    <div className="app">
      <header className="page-header">
        <h1>Recipe App</h1>
        <p>Browse recipes, save favorites, and sort by cook time</p>
      </header>

      <div className="content-layout">
        <aside className="sidebar">
          <Counter count={favorites.length} />

          <FavoritesSection
            favoriteRecipes={favoriteRecipes}
            clearFavorites={clearFavorites}
            toggleFavorite={toggleFavorite}
          />

          <TopRecipes recipes={recipes} />
        </aside>

        <main className="main-content">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            toggleSort={toggleSort}
          />

          <RecipeList
            recipes={sortedRecipes}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </main>
      </div>
    </div>
  );
}

export default App;