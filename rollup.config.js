"use strict";

const pkg = require("./package.json");

const input = "./src/router.js";

module.exports = [
    // ESM & CJS builds
    {
        input,

        output : [{
            file      : pkg.main,
            format    : "cjs",
            sourcemap : true,
        }, {
            file      : pkg.module,
            format    : "es",
            sourcemap : true,
        }],
    },

    // browser UMD build
    {
        input,

        output : {
            name      : pkg.name,
            file      : pkg.browser,
            format    : "umd",
            sourcemap : true,
        },

        plugins : [
            require("rollup-plugin-terser").terser(),
            require("rollup-plugin-buble")(),
        ],
    },
];
