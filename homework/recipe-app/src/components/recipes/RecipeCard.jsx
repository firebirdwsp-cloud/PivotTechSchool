import { useState } from "react";

function RecipeCard({ recipe, isFavorite, toggleFavorite }) {
  const [showIngredients, setShowIngredients] = useState(false);

  function toggleIngredients() {
    setShowIngredients(!showIngredients);
  }

  const stars = "⭐".repeat(recipe.rating) + "☆".repeat(5 - recipe.rating);

  return (
    <div className="recipe-card">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(recipe.id)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <h2 className="recipe-title">{recipe.name}</h2>

      <p className="recipe-rating">{stars}</p>

      <p className={`recipe-difficulty ${recipe.difficulty.toLowerCase()}`}>
        Difficulty: {recipe.difficulty}
      </p>

      <p className="recipe-description">{recipe.description}</p>

      <button className="ingredients-button" onClick={toggleIngredients}>
        {showIngredients ? "Hide Ingredients" : "Show Ingredients"}
      </button>

      {showIngredients && (
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}

      <p className="recipe-time">◷ {recipe.time} min</p>
      <p className="recipe-date">Created: {recipe.createdAt}</p>
    </div>
  );

  <p className="recipe-date">
  Created: {new Date(recipe.createdAt).toLocaleDateString()}
</p>
}

export default RecipeCard;