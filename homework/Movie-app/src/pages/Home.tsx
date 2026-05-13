import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";
import { getPopularMovies, searchMovies } from "../api/tmdb";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setLoading(true);
        setError("");

        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, []);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (searchTerm.trim() === "") {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } else {
        const searchedMovies = await searchMovies(searchTerm);
        setMovies(searchedMovies);
      }
    } catch {
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearch}
      />

      {loading && <p className="status-message">Loading movies...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="status-message">No movies found.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <main className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </main>
      )}
    </>
  );
}

export default Home;