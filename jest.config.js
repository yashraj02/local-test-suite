module.exports = {
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  testMatch: ['**/tests/**/*.test.js'],
};
