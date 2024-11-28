/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  testMatch: ['**/*.test.ts'],
  modulePathIgnorePatterns: ['<rootDir>/.yalc/'] // Ignore .yalc folder
};
