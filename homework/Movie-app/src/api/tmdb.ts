import type { Movie } from "../types/Movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  const data: MovieResponse = await response.json();
  return data.results;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data: MovieResponse = await response.json();
  return data.results;
}

export async function getMovieDetails(movieId: string): Promise<Movie> {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data: Movie = await response.json();
  return data;
}