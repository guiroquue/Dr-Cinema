import "dotenv/config";

export default {
  expo: {
    name: "dr-cinema",
    slug: "dr-cinema",
    scheme: "dr-cinema",
    extra: {
      KVIKMYNDIR_BASE_URL: process.env.EXPO_PUBLIC_KVIKMYNDIR_BASE_URL,
      KVIKMYNDIR_API_KEY: process.env.EXPO_PUBLIC_KVIKMYNDIR_API_KEY,
    }
  }
};
