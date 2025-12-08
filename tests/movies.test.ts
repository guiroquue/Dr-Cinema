import { fetchMovies } from "@/services/movies_service";

describe("Kvikmyndir API - Movies Endpoint", () => {
  test("should return movie data successfully", async () => {
    const data = await fetchMovies();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    console.log("Received movies:", data.length);
  });

  test("should fail with an invalid token", async () => {
  await expect(fetchMovies(undefined, "INVALID_TOKEN"))
    .rejects
    .toThrow();
  });
});
