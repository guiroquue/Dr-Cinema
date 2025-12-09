import { apiGet } from "./api";
import type { Movie } from "@/types/movie";


export async function fetchMovieByImdb(
  imdbId: string,
  baseUrl?: string,
  token?: string
): Promise<Movie> {
  const normalized =
    imdbId.trim().startsWith("tt") ? imdbId.trim() : `tt${imdbId.trim()}`;

  const data = await apiGet(
    `/upcoming?imdbid=${encodeURIComponent(normalized)}`,
    baseUrl,
    token
  );

  // API returns an array, we want a single movie
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }

  throw new Error("Movie not found");
}
