import { Link } from "react-router";
import type { Movie } from "../types/Movie";
import { genreMap } from "../data/genres";

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
};

function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||
    "https://image.tmdb.org/t/p/w500";

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";

  const genres = movie.genre_ids
    ? movie.genre_ids
        .map((genreId) => genreMap[genreId])
        .filter(Boolean)
        .join(", ")
    : "No genre listed";

  return (
    <article className="movie-card">
      <button
        className={`favorite-button ${
          isFavorite ? "favorite-button-active" : ""
        }`}
        type="button"
        onClick={() => onToggleFavorite(movie)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <Link to={`/movie/${movie.id}`} className="movie-card-content">
        <img className="movie-poster" src={posterUrl} alt={movie.title} />

        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>

          <p className="movie-year">
            {movie.release_date ? movie.release_date.slice(0, 4) : "No year"}
          </p>

          <p className="movie-genre">{genres || "No genre listed"}</p>

          <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</p>

          <p className="movie-overview">{movie.overview}</p>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;