import { apiGet } from "./api";
import type { Movie } from "@/src/types/movie";

export function fetchUpcoming(
  baseUrl?: string,
  token?: string
)
  {
  return apiGet("/upcoming", baseUrl, token) as Promise<Movie[]>;
}
