import Constants from "expo-constants";

/**
 * Generic GET helper for all Kvikmyndir API endpoints.
 *
 * Uses header-based auth (x-access-token) to avoid putting tokens in URLs.
 */
const extra =
  Constants.expoConfig?.extra ??
  Constants.manifest2?.extra ??
  {};

export async function apiGet(
  path: string,
  baseUrl = extra.KVIKMYNDIR_BASE_URL,
  token = extra.KVIKMYNDIR_API_KEY
) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    headers: {
      "x-access-token": token,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  if (data?.success === false) throw new Error(data.message || "API error");

  return data;
}
