"use strict";

const router = require("../src/router.js");

describe("router", () => {
    const original = router._unknown;
    
    beforeEach(() => {
        router._routes = Object.create(null);

        router._unknown = original;
    });

    describe("router.unknown", () => {
        it("should throw an error by default", () => {
            router("/fooga", jest.fn());

            expect(() => router.go("/wooga")).toThrowErrorMatchingSnapshot();
        });

        it("should allow providing a new unknown handler", () => {
            const fn = jest.fn();
            
            router.unknown(fn);

            router("/fooga", jest.fn());

            router.go("/wooga");

            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
