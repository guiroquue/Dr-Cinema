import "dotenv/config";

export default {
  expo: {
    name: "Dr Cinema",
    slug: "dr-cinema",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    scheme: "dr-cinema",

    icon: "./src/assets/images/icon.png",

    splash: {
      image: "./src/assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },

    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.drcinema.app",
    },


    extra: {
      KVIKMYNDIR_BASE_URL: process.env.EXPO_PUBLIC_KVIKMYNDIR_BASE_URL,
      KVIKMYNDIR_API_KEY: process.env.EXPO_PUBLIC_KVIKMYNDIR_API_KEY,
    },
  },
};
