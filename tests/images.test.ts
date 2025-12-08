import { fetchImages } from "@/services/images_service";

describe("Kvikmyndir API - Images Endpoint", () => {
  test("returns image results for a valid imdbid", async () => {
    const data = await fetchImages("tt1663202"); // Example: The Revenant
    expect(data).toBeDefined();
  });

  test("throws when imdbid is missing", () => {
    expect(() => fetchImages("")).toThrow("IMDb ID is required for image lookup");
  });

  test("fails with invalid token", async () => {
    await expect(fetchImages("tt1663202", "INVALID_TOKEN"))
      .rejects
      .toThrow();
  });
});
