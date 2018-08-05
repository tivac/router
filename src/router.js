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
        [ url ]);

const router = (route, fn) => {
    const parts = split(route);
    let pointer = router._routes;
    
    parts.forEach((part) => {
        let segment = part;
        
        if(!pointer[segment]) {
            const param = segment.startsWith(":");
            
            // Params are special
            if(param) {
                segment = paramKey;
                pointer[segment] = obj({
                    param : part.slice(1),
                });
            } else {
                pointer[segment] = obj();
            }
        }
        
        pointer = pointer[segment];
    });
    
    pointer.fn = fn;
};

router._routes = Object.create(null);

router._unknown = (ctx) => {
    throw new Error(`Unknown path: ${ctx.url}`);
};

router.unknown = (fn) => {
    router._unknown = fn;
};

router.go = (url, cb) => {
    const parts = split(url);
    const fns = [];
    
    let pointer = router._routes;
    
    parts.some((part) => {
        let segment = part || "/";
        
        // Handle wildcards at any level
        if(pointer["*"]) {
            fns.push(pointer["*"].fn);
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
                // Replace all functions
                fns.splice(0, fns.length - 1, router._unknown);
                
                // Stop iteration
                return true;
            }
        }
        
        pointer = pointer[segment];
        
        if(typeof pointer.fn === "function") {
            fns.push(pointer.fn);
        }

        return false;
    });
    
    // Prepare for iterating the chained functions representing this URL
    const limit = fns.length - 1;
    const ctx = obj({ url });
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
