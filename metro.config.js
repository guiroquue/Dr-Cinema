const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = config.resolver;

// Tell Metro to treat `.svg` as source, not as a static asset
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

config.resolver = {
  ...config.resolver,
  assetExts: assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...sourceExts, "svg"],
};

module.exports = config;
