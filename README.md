# @tivac/router

A very-simple router, inspired by [`page.js`](https://www.npmjs.com/package/page).

(You probably want to use `page.js`, honestly. This is just me experimenting!)

## Usage

Include in a `<script>` tag

```html
<script src="https://unpkg.com/router/dist/router.umd.js></script>
```

Or with `import`

```js
import router from "router";
```

Or with `require`

```js
const router = require("router");
```

## API

### `router(path, callback[, callback ...])`

Create a route mapping `path` to `callback`. See [Route Callbacks](#route-callbacks) for a description of the signature.

Returns the same `router` instance for optional chaining.

`path` supports `/:params` as well as `*` or `/path/*` style wildcards. No regex stuff though.

### `router.go(path, fn)`

Begin route matching for a path. `fn` will be called when all matched route handlers are complete.

### `router.unknown(fn)`

Define a `fn` that will be called when a route handler cannot be found.

## Route Callbacks

Route callbacks are passed two arguments:

1. `ctx`, a shared object available to all handlers of a request
2. `next()`, a function that will invoke any further route handlers.
