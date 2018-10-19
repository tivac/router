"use strict";

const router = require("../src/router.js");

describe("router", () => {
    beforeEach(() => {
        router._routes = Object.create(null);
    });

    describe("params", () => {
        it("should register parameterized routes", () => {
            router("/:fooga", jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });

        it("should register nested parameterized routes", () => {
            router("/:fooga/:booga", jest.fn());

            expect(router._routes).toMatchSnapshot();
        });
        
        it("should register parameterized routes w/ multiple callbacks", () => {
            router("/:fooga", jest.fn(), jest.fn(), jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });
        
        it("should register nested parameterized routes w/ multiple callbacks", () => {
            router("/:fooga", jest.fn(), jest.fn(), jest.fn());
            router("/:fooga/:booga", jest.fn(), jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });
    
        it("should match simple parameterized routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            router("/:fooga", fn);
    
            router.go("/fooga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    
        it("should match nested parameterized routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            router("/:fooga", fn);
            router("/:fooga/:booga", fn);
    
            router.go("/fooga/booga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
