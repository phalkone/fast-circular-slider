const path = require('path')

module.exports = {
  preset: 'ts-jest',
  rootDir: path.resolve(__dirname),
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: [
    'js', 'ts',
    'tsx', 'json'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/mocks/style-mock.js'
  },
  bail: true,
  collectCoverageFrom: ['src/**/*.{mjs,jsx,js,ts,tsx}'],
  testEnvironment: 'jsdom',
  testRegex: 'test/.*(_test|_spec|\\.test|\\.spec)\\.(mjs|jsx|js|ts|tsx)$',
  verbose: false,
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts']
}
