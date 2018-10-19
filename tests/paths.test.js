"use strict";

const router = require("../src/router.js");

describe("router", () => {
    beforeEach(() => {
        router._routes = Object.create(null);
    });

    describe("paths", () => {
        it("should register routes", () => {
            router("/fooga", jest.fn());

            expect(router._routes).toMatchSnapshot();
        });

        it("should register routes w/ multiple callbacks", () => {
            router("/fooga", jest.fn(), jest.fn(), jest.fn());

            expect(router._routes).toMatchSnapshot();
        });

        it("should call all the callbacks for each route", () => {
            const fn = jest.fn((ctx, next) => next());

            router("/fooga", fn, fn, fn);

            router.go("/fooga");

            expect(fn.mock.calls).toMatchSnapshot();
        });

        it("should match simple routes", () => {
            const fn = jest.fn((ctx, next) => next());

            router("/fooga", fn);

            router.go("/fooga");

            expect(fn.mock.calls).toMatchSnapshot();
        });

        it("should match nested routes", () => {
            const fn = jest.fn((ctx, next) => next());

            router("/fooga", fn);
            router("/fooga/booga", fn);

            router.go("/fooga/booga");

            expect(fn.mock.calls).toMatchSnapshot();
        });

        it("should stop at the right time", () => {
            const fn = jest.fn((ctx, next) => next());

            router("/fooga", fn);
            router("/fooga/booga", fn);

            router.go("/fooga");

            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
