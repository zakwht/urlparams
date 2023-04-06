# URLSearchParams Wrapper

[![License](https://img.shields.io/github/license/zakwht/urlparams-ts)](./LICENSE.md)
[![Version](https://img.shields.io/npm/v/urlparams-ts)](https://www.npmjs.com/package/urlparams-ts)
[![Downloads](https://img.shields.io/npm/dt/urlparams-ts)](https://www.npmjs.com/package/urlparams-ts)
[![Size](https://img.shields.io/bundlephobia/minzip/urlparams-ts?label=size)](https://bundlephobia.com/result?p=urlparams-ts)

A lightweight TypeScript wrapper for the URLSearchParams interface, for easy compatibility with strings and Objects for search query parameters.

### Usage
```shell
$ npm install urlparams-ts
```
Create an instance of `URLParams` by supplying a query string, an object with primitive values, or a URL. If no argument is provided, the constructor will use the current URL from `window.location`. 

```typescript
import { URLParams } from "urlparams-ts"
// from string
let params = new URLParams("?text=abc&bool=false")
// from object
params = new URLParams({
  text: "abc",
  bool: false
})
// from URL
params = new URLParams("https://github.com?text=abc&bool=false#latest")
// no parameter: use window.location
params = new URLParams()
```

The API of `URLParams` is
* `toURLSearchParams()` ⇒ `URLSearchParams`
* `toObject()` ⇒ `Object`
* `toString()` ⇒ `string`
* `toCastedObject` ⇒ `Object`
  * Object with values casted as numbers or booleans where applicable


```typescript
let params = new URLParams({
  text: "abc",
  bool: false,
  num: 10,
  nothing: undefined
})

params.toString()
// 'text=abc&bool=false&num=10'
params.toURLSearchParams()
// URLSearchParams { 'text' => 'abc', ... }
params.toCastedObject()
// { text: 'abc', bool: false, num: 10 }
```


### Acknowledgments
- __Hosted on__ [GitHub](https://github.com)

