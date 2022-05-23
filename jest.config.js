module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|svg)$": "test-file-stub",
      "\\.(css|less|scss|sass)$": "test-css-stub",
      "^actors/(.*)$": "<rootDir>/src/actors/$1",
      "^constants/(.*)$": "<rootDir>/src/constants/$1",
      "^components/(.*)$": "<rootDir>/src/components/$1",
      "^static/(.*)$": "<rootDir>/src/static/$1",
    },
    testPathIgnorePatterns: ["/node_modules/"],

    collectCoverageFrom: [
        "src/**/*.js",
        "!src/index.js"
    ],
    coverageReporters: [
        "text"
    ],
}