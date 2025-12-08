module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/tests/setupEnv.js"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/tests/__mocks__/svgMock.tsx",
  },
};
