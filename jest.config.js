module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Constants(.*)$': '<rootDir>/src/constants$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
    '^Assets(.*)$': '<rootDir>/src/assets$1',
    '^Pages(.*)$': '<rootDir>/src/pages$1',
    '\\.(scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg',
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'tests'],
  extensionsToTreatAsEsm: ['.jsx'],
}
