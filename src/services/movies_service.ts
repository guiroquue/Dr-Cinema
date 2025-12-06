import { apiGet } from "./api";

export function fetchMovies(
  baseUrl?: string,
  token?: string
) {
  return apiGet("/movies", baseUrl, token);
}
