import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, favorites, toggleFavorite }) {
  return (
    <div className="cards-column">
      {recipes.length === 0 ? (
        <p className="no-results">No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            toggleFavorite={toggleFavorite}
          />
        ))
      )}
    </div>
  );
}

export default RecipeList;