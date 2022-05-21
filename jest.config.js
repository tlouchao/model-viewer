module.exports = {
    "moduleNameMapper": {
      "^actors/(.*)$": "<rootDir>/src/actors/$1",
      "^constants/(.*)$": "<rootDir>/src/constants/$1",
      "^components/(.*)$": "<rootDir>/src/components/$1",
    },
    "testPathIgnorePatterns": ["/node_modules/"],
}