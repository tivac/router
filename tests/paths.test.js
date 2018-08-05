"use strict";

const hrouter = require("../src/router.js");

describe("hrouter", () => {
    beforeEach(() => {
        hrouter._routes = Object.create(null);
    });

    describe("paths", () => {
        it("should register routes", () => {
            hrouter("/fooga", jest.fn());

            expect(hrouter._routes).toMatchSnapshot();
        });

        it("should register routes w/ multiple callbacks", () => {
            hrouter("/fooga", jest.fn(), jest.fn(), jest.fn());

            expect(hrouter._routes).toMatchSnapshot();
        });

        it("should match simple routes", () => {
            const fn = jest.fn((ctx, next) => next());

            hrouter("/fooga", fn);

            hrouter.go("/fooga");

            expect(fn.mock.calls).toMatchSnapshot();
        });

        it("should match nested routes", () => {
            const fn = jest.fn((ctx, next) => next());

            hrouter("/fooga", fn);
            hrouter("/fooga/booga", fn);

            hrouter.go("/fooga/booga");

            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
