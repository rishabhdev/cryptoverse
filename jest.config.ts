import type { Config } from 'jest'

const config: Config = {
//   preset: 'ts-jest',
  preset: 'ts-jest/presets/js-with-babel',

  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle module aliases (if you're using them)
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react|eact-dom|react-router-dom|react-router)/)"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

export default config 