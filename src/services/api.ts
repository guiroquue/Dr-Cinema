/**
 * Generic GET helper for all Kvikmyndir API endpoints.
 *
 * Responsibilities:
 *  - Build the final request URL (including token).
 *  - Support overriding baseUrl and token (used mainly in tests).
 *  - Normalize error handling for:
 *      1. HTTP-level failures      (response.ok === false)
 *      2. API-level failures       (JSON contains success: false)
 *  - Return parsed JSON on success.
 *
 * Every endpoint-specific service uses this to keep logic consistent.
 */
export async function apiGet(
  path: string,
  baseUrl = process.env.EXPO_PUBLIC_KVIKMYNDIR_BASE_URL,
  token = process.env.EXPO_PUBLIC_KVIKMYNDIR_API_KEY
) {

  // The API format requires `?token=...` even if other query params exist.
  // We check whether the `path` already includes `?` to append correctly.
  const url = `${baseUrl}${path}${
    path.includes("?") ? "&" : "?"
  }token=${token}`;

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();

  // HTTP-level error (network or server response)
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  // API-level error (returned JSON error body)
  if (data.success === false) {
    throw new Error(data.message || "API error");
  }

  return data;
}
