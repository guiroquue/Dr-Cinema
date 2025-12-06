import { apiGet } from "./api";

export function fetchSearch(
  query: string,
  token?: string,
  baseUrl?: string
) {
  if (!query || query.trim().length === 0) {
    throw new Error("Search query is required");
  }

  return apiGet(`/search?q=${encodeURIComponent(query)}`, baseUrl, token);
}
