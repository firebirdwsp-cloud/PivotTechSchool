import type { Movie } from "../types/Movie";

const BASE_URL = "http://localhost:3000/api";

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function getPopularMovies(): Promise<Movie[]> {
  return fetchData<Movie[]>(`${BASE_URL}/movies/popular`);
}

export function getNowPlayingMovies(): Promise<Movie[]> {
  return fetchData<Movie[]>(`${BASE_URL}/movies/now-playing`);
}

export function searchMovies(searchTerm: string): Promise<Movie[]> {
  return fetchData<Movie[]>(
    `${BASE_URL}/movies/search?query=${encodeURIComponent(searchTerm)}`
  );
}

export function getMovieDetails(movieId: string | number): Promise<Movie> {
  return fetchData<Movie>(`${BASE_URL}/movies/${movieId}`);
}