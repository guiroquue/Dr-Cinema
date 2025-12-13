import { apiGet } from "./api";
import type { Movie } from "@/types/movie";

export function fetchCurrentMovies(
  baseUrl?: string,
  token?: string
)
  {
  return apiGet("/movies", baseUrl, token) as Promise<Movie[]>;
}
