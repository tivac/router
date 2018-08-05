"use strict";

const hrouter = require("../dist/hrouter.cjs.js");

describe("hrouter", () => {
    beforeEach(() => {
        hrouter._routes = Object.create(null);
    });

    it("should register routes", () => {
        hrouter("/fooga", () => {});

        expect(hrouter._routes).toMatchSnapshot();
    });
});
