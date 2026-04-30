function FavoriteCard({ recipe, toggleFavorite }) {
  return (
    <div className="favorite-card">
      <img src={recipe.image} alt={recipe.name} className="favorite-image" />

      <div className="favorite-info">
        <p className="favorite-name">{recipe.name}</p>
      </div>

      <button
        className="favorite-small-button"
        onClick={() => toggleFavorite(recipe.id)}
      >
        ❤️
      </button>
    </div>
  );
}

export default FavoriteCard;