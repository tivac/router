"use strict";

const router = require("../src/router.js");

describe("router", () => {
    beforeEach(() => {
        router._routes = Object.create(null);
    });

    describe("wildcards", () => {
        it("should register wildcard routes", () => {
            router("/*", jest.fn());
            router("*", jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });

        it("should register nested wildcard routes", () => {
            router("/fooga/*", jest.fn());

            expect(router._routes).toMatchSnapshot();
        });
        
        it("should register wildcard routes w/ multiple callbacks", () => {
            router("/*", jest.fn(), jest.fn(), jest.fn());
            router("*", jest.fn(), jest.fn(), jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });
        
        it("should register nested wildcard routes w/ multiple callbacks", () => {
            router("/*", jest.fn(), jest.fn(), jest.fn());
            router("/fooga/*", jest.fn(), jest.fn());
    
            expect(router._routes).toMatchSnapshot();
        });
    
        it("should match simple wildcard routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            router("/*", fn);
            router("/fooga", fn);
    
            router.go("/fooga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    
        it("should match nested wildcard routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            router("/*", fn);
            router("/fooga", fn);
            router("/fooga/*", fn);
            router("/fooga/booga", fn);
    
            router.go("/fooga/booga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
