import { fetchTheaters } from "../src/services/theaters_service";

describe("Kvikmyndir API - Theaters Endpoint", () => {
  test("returns theaters list", async () => {
    const data = await fetchTheaters();
    expect(Array.isArray(data)).toBe(true);
  });

  test("fails with invalid token", async () => {
    await expect(fetchTheaters(undefined, "INVALID_TOKEN"))
      .rejects
      .toThrow();
  });
});
