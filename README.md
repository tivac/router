# hrouter

A very-simple router, inspired by [`page.js`](https://www.npmjs.com/package/page).

(You probably want to use `page.js`, honestly. This is just me experimenting!)

## Usage

Include in a `<script>` tag

```html
<script src="https://unpkg.com/hrouter/dist/hrouter.umd.js></script>
```

Or with `import`

```js
import hrouter from "hrouter";
```

Or with `require`

```js
const hrouter = require("hrouter");
```

## API

### `hrouter(path, callback[, callback ...])`

Create a route mapping `path` to `callback`. See [Route Callbacks](#route-callbacks) for a description of the signature.

Returns the same `hrouter` instance for optional chaining.

### `hrouter.go(path, fn)`

Begin route matching for a path. `fn` will be called when all matched route handlers are complete.

### `hrouter.unknown(fn)`

Define a `fn` that will be called when a route handler cannot be found.

## Route Callbacks

Route callbacks are passed two arguments:

1. `ctx`, a shared object available to all handlers of a request
2. `next()`, a function that will invoke any further route handlers.
