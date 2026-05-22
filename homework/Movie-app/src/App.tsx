import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import NowPlaying from "./pages/NowPlaying";
import Login from "./pages/Login";

import type { Movie } from "./types/Movie";

function App() {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites) as Movie[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(movie: Movie) {
    const isAlreadyFavorite = favorites.some(
      (favoriteMovie) => favoriteMovie.id === movie.id
    );

    if (isAlreadyFavorite) {
      setFavorites(
        favorites.filter((favoriteMovie) => favoriteMovie.id !== movie.id)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home favorites={favorites} onToggleFavorite={toggleFavorite} />
          }
        />

        <Route
          path="/now-playing"
          element={
            <NowPlaying
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/movie/:movieId"
          element={
            <MovieDetails
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;