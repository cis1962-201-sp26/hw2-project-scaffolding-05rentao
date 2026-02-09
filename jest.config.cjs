module.exports = {
  preset: 'ts-jest/presets/default-esm', // Specifically handles ESM
  testEnvironment: 'node',
  moduleNameMapper: {
    // Maps your 'index.js' imports to 'index.ts' files
    '^(\\.\\.?/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Tells ts-jest to respect your ESM project type
      },
    ],
  },
};