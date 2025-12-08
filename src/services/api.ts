import Constants from "expo-constants";

/**
 * Generic GET helper for all Kvikmyndir API endpoints.
 *
 * Responsibilities:
 *  - Build the final request URL (including token).
 *  - Support overriding baseUrl and token (used mainly in tests).
 *  - Normalize error handling for:
 *      1. HTTP-level failures
 *      2. API-level failures
 *  - Return parsed JSON on success.
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
  const url = `${baseUrl}${path}${path.includes("?") ? "&" : "?"}token=${token}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  if (data.success === false) throw new Error(data.message || "API error");

  return data;
}
