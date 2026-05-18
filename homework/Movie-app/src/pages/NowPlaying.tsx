import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";
import { getNowPlayingMovies } from "../api/tmdb";

type NowPlayingProps = {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
};

function NowPlaying({ favorites, onToggleFavorite }: NowPlayingProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadNowPlayingMovies() {
      try {
        setLoading(true);
        setError("");

        const nowPlayingMovies = await getNowPlayingMovies();
        setMovies(nowPlayingMovies);
      } catch {
        setError("Failed to load now playing movies.");
      } finally {
        setLoading(false);
      }
    }

    loadNowPlayingMovies();
  }, []);

  function isMovieFavorite(movieId: number) {
    return favorites.some((favoriteMovie) => favoriteMovie.id === movieId);
  }

  return (
    <>
      <section className="page-screen">
        <h1 className="page-title">Now Playing</h1>

        <p className="page-text">
          Browse movies that are currently playing in theaters.
        </p>
      </section>

      {loading && (
        <p className="status-message">Loading now playing movies...</p>
      )}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="status-message">No movies found.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <main className="movie-grid now-playing-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isMovieFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </main>
      )}
    </>
  );
}

export default NowPlaying;