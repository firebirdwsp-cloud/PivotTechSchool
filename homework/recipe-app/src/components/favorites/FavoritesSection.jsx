import FavoriteCard from "./FavoriteCard";

function FavoritesSection({ favoriteRecipes, clearFavorites, toggleFavorite }) {
  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2 className="favorites-heading">My Favorites</h2>

        {favoriteRecipes.length > 0 && (
          <button className="clear-favorites-button" onClick={clearFavorites}>
            Clear All
          </button>
        )}
      </div>

      {favoriteRecipes.length === 0 ? (
        <p className="no-favorites">No favorites selected yet.</p>
      ) : (
        <div className="favorites-list">
          {favoriteRecipes.map((recipe) => (
            <FavoriteCard
              key={recipe.id}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesSection;