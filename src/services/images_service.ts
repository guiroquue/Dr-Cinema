import { apiGet } from "./api";

export function fetchImages(
  imdbid: string,
  token?: string,
  baseUrl?: string
) {
  if (!imdbid || imdbid.trim().length === 0) {
    throw new Error("IMDb ID is required for image lookup");
  }

  // /images?imdbid=ttXXXXX
  return apiGet(`/images?imdbid=${encodeURIComponent(imdbid)}`, baseUrl, token);
}
