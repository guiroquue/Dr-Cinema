import { fetchSearch } from "../src/services/search_service";

describe("Kvikmyndir API - Search Endpoint", () => {

  test("returns results for a valid query", async () => {
    const data = await fetchSearch("batman");
    expect(data).toBeDefined();
  });

  test("throws when called without a query", async () => {
    expect(() => fetchSearch("")).toThrow("Search query is required");
  });

  test("fails with invalid token", async () => {
    await expect(fetchSearch("batman", "INVALID_TOKEN"))
      .rejects
      .toThrow();
  });

});
