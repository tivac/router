"use strict";

module.exports = {
    projects : [
        {
            displayName : "hrouter tests",

            watchPathIgnorePatterns : [ "<rootDir>/src/" ],
            
            // Fix exciting localStorage issues because jest uses jsdom wrong
            // https://github.com/jsdom/jsdom/issues/2304
            // https://github.com/facebook/jest/pull/6792
            testURL : "http://localhost",
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
