"use strict";

const hrouter = require("../src/router.js");

describe("hrouter", () => {
    beforeEach(() => {
        hrouter._routes = Object.create(null);
    });

    describe("wildcards", () => {
        it("should register wildcard routes", () => {
            hrouter("/*", jest.fn());
            hrouter("*", jest.fn());
    
            expect(hrouter._routes).toMatchSnapshot();
        });

        it("should register nested wildcard routes", () => {
            hrouter("/fooga/*", jest.fn());

            expect(hrouter._routes).toMatchSnapshot();
        });
        
        it("should register wildcard routes w/ multiple callbacks", () => {
            hrouter("/*", jest.fn(), jest.fn(), jest.fn());
            hrouter("*", jest.fn(), jest.fn(), jest.fn());
    
            expect(hrouter._routes).toMatchSnapshot();
        });
        
        it("should register nested wildcard routes w/ multiple callbacks", () => {
            hrouter("/*", jest.fn(), jest.fn(), jest.fn());
            hrouter("/fooga/*", jest.fn(), jest.fn());
    
            expect(hrouter._routes).toMatchSnapshot();
        });
    
        it("should match simple wildcard routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            hrouter("/*", fn);
            hrouter("/fooga", fn);
    
            hrouter.go("/fooga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    
        it("should match nested wildcard routes", () => {
            const fn = jest.fn((ctx, next) => next());
    
            hrouter("/*", fn);
            hrouter("/fooga", fn);
            hrouter("/fooga/*", fn);
            hrouter("/fooga/booga", fn);
    
            hrouter.go("/fooga/booga");
    
            expect(fn.mock.calls).toMatchSnapshot();
        });
    });
});
