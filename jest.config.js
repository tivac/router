"use strict";

module.exports = {
    projects : [
        {
            displayName : "test",

            watchPathIgnorePatterns : [ "<rootDir>/src/" ],
        },
        {
            runner      : "jest-runner-eslint",
            displayName : "lint",
            testMatch   : [
                "<rootDir>/src/**/*.js",
            ],
        },
    ],
};
