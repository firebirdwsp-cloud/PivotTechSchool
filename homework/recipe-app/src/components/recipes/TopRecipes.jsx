function TopRecipes({ recipes }) {
  const topThreeRecipes = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="top-recipes-section">
      <h2 className="top-recipes-heading">Top Recipes</h2>

      <div className="top-recipes-list">
        {topThreeRecipes.map((recipe) => (
          <div className="top-recipe-card" key={recipe.id}>
            <img
              src={recipe.image}
              alt={recipe.name}
              className="top-recipe-image"
            />

            <div className="top-recipe-info">
              <p className="top-recipe-name">{recipe.name}</p>
              <p className="top-recipe-rating">
                {"⭐".repeat(recipe.rating) + "☆".repeat(5 - recipe.rating)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRecipes;