"use strict";

const router = require("../src/router.js");

describe("router", () => {
    beforeEach(() => {
        router._routes = Object.create(null);
    });

    describe(".go()", () => {
        it("should call the callback once the route handlers are complete", () => {
            const fn = jest.fn((ctx, next) => next && next());

            router("/fooga", fn);

            router.go("/fooga", fn);

            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
