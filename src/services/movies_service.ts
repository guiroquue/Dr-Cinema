import { Image } from "react-native-svg";
import { apiGet } from "./api";
import type { Movie } from "@/types/movie";

export function fetchMovies(baseUrl?: string, token?: string) {
  return apiGet("/movies", baseUrl, token) as Promise<Movie[]>;
}

export async function fetchMovieByImdbId(
  imdbId: string,
  baseUrl?: string,
  token?: string
): Promise<Movie & { image: Image }> {
  const normalized = imdbId.trim().startsWith("tt") ? imdbId.trim() : `tt${imdbId.trim()}`;

  const [image, movie] = await Promise.all([
    apiGet(`/images?imdbid=${encodeURIComponent(normalized)}`, baseUrl, token) as Promise<Image>,
    apiGet(`/movies?imdbid=${encodeURIComponent(normalized)}`, baseUrl, token) as Promise<Movie>,
  ]);

  return { ...movie, image };
}

