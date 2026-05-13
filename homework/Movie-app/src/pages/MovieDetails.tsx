import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Movie } from "../types/Movie";
import { getMovieDetails } from "../api/tmdb";

function MovieDetails() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadMovieDetails() {
      if (!movieId) {
        setError("No movie ID found.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p className="status-message">Loading movie details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return <p className="status-message">No movie selected.</p>;
  }

  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";

  const genres = movie.genres?.map((genre) => genre.name).join(", ");

  return (
    <section className="details-page">
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="details-card">
        <img className="details-poster" src={posterUrl} alt={movie.title} />

        <div className="details-info">
          <h1 className="details-title">{movie.title}</h1>

          {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

          <p className="details-meta">
            {movie.release_date ? movie.release_date.slice(0, 4) : "No year"} |{" "}
            ⭐ {movie.vote_average.toFixed(1)}
          </p>

          {movie.runtime && (
            <p className="details-meta">Runtime: {movie.runtime} minutes</p>
          )}

          <p className="movie-genre">{genres || "No genre listed"}</p>

          <h2>Overview</h2>
          <p className="details-overview">{movie.overview}</p>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;