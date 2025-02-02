# react-html-body-classname

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependency status][david-dm-image]][david-dm-url]

Provides a declarative way to specify `document.documentElement.className` and `document.body.className` in your react app.

---

## Install

```
npm i --save react-html-body-classname
```

Dependencies: React ^17.0.2 & ReactDOM ^17.0.2

## What it looks like

```jsx
import { HtmlClassName, BodyClassName } from 'react-html-body-classname'

const BasicBody = () => (
  <BodyClassName className='helloworld' id='helloworldid'>
    <h1>You ate a whole wheel of cheese?</h1>
  </BodyClassName>
)
// -> document.body.className === "helloworld"

const BasicHtml = () => (
  <HtmlClassName className='helloworld' id='helloworldid'>
    <h1>You ate a whole wheel of cheese?</h1>
  </HtmlClassName>
)
// -> document.documentElement.className === "helloworld"

const NestedBody = () => (
  <BodyClassName className='outside' id='outsideid'>
    <div>
      <BodyClassName className='inside' id='insideid'>
        <p>I‘m not even mad</p>
      </BodyClassName>
    </div>
  </BodyClassName>
)
// -> document.body.className === "outside inside"

const NestedHtml = () => (
  <HtmlClassName className='outside' id='outsideid'>
    <div>
      <HtmlClassName className='inside' id='insideid'>
        <p>I‘m not even mad</p>
      </HtmlClassName>
    </div>
  </HtmlClassName>
)
// -> document.documentElement.className === "outside inside"

const GoCrazy = () => (
  <HtmlClassName className={Array(8).join('' / 0) + ' batman!'} id='crazyid'>
    <BodyClassName className='body classes' id='bodyclassesid'>
      <h1>I'm impressed</h1>
    </BodyClassName>
  </HtmlClassName>
)
// -> document.documentElement.className === "NaNNaNNaNNaNNaNNaNNaN batman!"
// -> document.body.className === "body classes"
```

**Note**: Only supports a single child as props.

[npm-url]: https://npmjs.org/package/react-html-body-classname
[downloads-image]: http://img.shields.io/npm/dm/react-html-body-classname.svg
[npm-image]: http://img.shields.io/npm/v/react-html-body-classname.svg
[david-dm-url]: https://david-dm.org/loliver/react-html-body-classname
[david-dm-image]: https://david-dm.org/loliver/react-html-body-classname.svg
