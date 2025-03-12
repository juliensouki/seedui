export default {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/seedui/src/**/*.{js,jsx,ts,tsx}',
    '!packages/seedui/src/theme/box-shadow/**/*',
    '!packages/seedui/src/theme/breakpoints/**/*',
    '!packages/seedui/src/theme/components/**/*',
    '!packages/seedui/src/theme/palettes/**/*',
    'packages/seedui/src/theme/**/*.service.ts',
    'packages/seedui/src/theme/palettes/utils.ts',
    '!packages/seedui/src/index.ts',
    '!packages/seedui/src/helpers/tests.tsx',
    '!packages/seedui/src/components/index.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/jest/mock-style.ts',
  },
  coverageReporters: ['json-summary', 'json', 'html', 'text', 'lcov'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/jest-setup.ts'],
};
