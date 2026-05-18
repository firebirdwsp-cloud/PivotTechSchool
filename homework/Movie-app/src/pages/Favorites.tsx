import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";

type FavoritesProps = {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
};

function Favorites({ favorites, onToggleFavorite }: FavoritesProps) {
  return (
    <>
      <section className="page-screen">
        <h1 className="page-title">Favorite Movies</h1>

        {favorites.length === 0 ? (
          <p className="page-text">
            You have not added any favorite movies yet. Click the heart on a
            movie card to save it here.
          </p>
        ) : (
          <p className="page-text">
            Here are the movies you added to your favorites.
          </p>
        )}
      </section>

      {favorites.length > 0 && (
        <main className="movie-grid favorites-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </main>
      )}
    </>
  );
}

export default Favorites;