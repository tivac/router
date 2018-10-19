const paramKey = "__param__";

const obj = (args) => {
    const out = Object.create(null);

    if(args) {
        Object.assign(out, args);
    }

    return out;
};

const split = (url) => (
    url.includes("/") ?
        url.split("/").slice(1) :
        [ url ]
);

const router = (route, ...fns) => {
    const parts = split(route);
    let pointer = router._routes;
    
    parts.forEach((part) => {
        const param = part.startsWith(":");
        let segment = part;

        // Params are special
        if(param) {
           segment = paramKey;
        }

        if(!pointer[segment]) {
            if(param) {
                pointer[segment] = obj({
                    param : part.slice(1),
                });
            } else {
                pointer[segment] = obj();
            }
        }
        
        pointer = pointer[segment];
    });
    
    pointer.fns = fns;

    return router;
};

router.version = "VERSION";

router._routes = obj();

router._unknown = (ctx) => {
    throw new Error(`Unknown path: ${ctx.url}`);
};

router.unknown = (fn) => {
    router._unknown = fn;

    return router;
};

router.go = (url, cb) => {
    const parts = split(url);
    const fns = [];
    
    let pointer = router._routes;
    let unknown;
    
    parts.some((part, idx) => {
        let segment = part;

        // Handle wildcards at any level
        if(pointer["*"]) {
            fns.push(...pointer["*"].fns);
        }
        
        if(!pointer[segment]) {
            // Check for a param value first
            if(pointer[paramKey]) {
                const name = pointer[paramKey].param;

                segment = paramKey;

                fns.push((ctx, next) => {
                    if(!ctx.params) {
                        ctx.params = obj();
                    }
                    
                    ctx.params[name] = part;
                    
                    return next();
                });
            } else {
                // Unknown path, flag it and bail on iteration
                unknown = router._unknown;
                
                return true;
            }
        }
        
        pointer = pointer[segment];
        
        // Only push segment matches if we're at the leaf
        if(idx === parts.length - 1) {
            fns.push(...pointer.fns);
        }

        return false;
    });
    
    const ctx = obj({ url });

    if(unknown) {
        return unknown(ctx);
    }
    
    // Prepare for iterating the chained functions representing this URL
    const limit = fns.length - 1;
    let idx = -1;

    const next = () => {
        if(idx + 1 > limit) {
            return typeof cb === "function" ? cb(ctx) : true;
        }
        
        return fns[++idx](ctx, next);
    };
    
    next();
};

export default router;
