export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  release_date: string;
  vote_average: number;

  // Used on popular/search movie results
  genre_ids?: number[];

  // Used on movie details page
  genres?: Genre[];

  // Extra details from the movie details endpoint
  runtime?: number;
  tagline?: string;
};