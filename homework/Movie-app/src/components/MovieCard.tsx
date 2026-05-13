import { Link } from "react-router";
import type { Movie } from "../types/Movie";
import { genreMap } from "../data/genres";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

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
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <article className="movie-card">
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
      </article>
    </Link>
  );
}

export default MovieCard;