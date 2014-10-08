Router
======

A simple router utility to match patterns with URLs.

## Installation

```shell
npm install git+https://git@github.com/philipwalton/router.git
```

## Usage

```js
var router = require('router');

new Router()
    .case('/', function() {
      // The home page.
    });
    .case('/products/', function() {
      // The products list page.
    })
    .case('products/<id>/', function(id) {
      // An individual product page. The `id` variable is passed through.
    })
    .match(location.pathname);
```

## API Reference

- Class [Router](https://github.com/philipwalton/router/blob/master/docs/router.md)





