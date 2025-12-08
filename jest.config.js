module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/tests/setupEnv.js"],

  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tests/__mocks__/svgMock.tsx",
    "^expo-constants$": "<rootDir>/tests/__mocks__/expo-constants.js",
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  transformIgnorePatterns: [
    "node_modules/(?!expo|expo-constants|expo-modules-core)"
  ],
};
