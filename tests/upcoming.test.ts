import { fetchUpcoming } from "@/services/upcoming_service";

describe("Kvikmyndir API - Upcoming Endpoint", () => {
  test("returns upcoming movies", async () => {
    const data = await fetchUpcoming();
    expect(Array.isArray(data)).toBe(true);
  });

  test("fails with invalid token", async () => {
    await expect(fetchUpcoming(undefined, "INVALID_TOKEN"))
      .rejects
      .toThrow();
  });
});
