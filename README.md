React Body ClassName
====================

Provides a declarative way to specify `document.body.className` in a single-page app.  
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

====================

## Installation

```
npm install --save react-body-classname
```

Dependencies: React >= 0.13.0

## Features

* Does not emit DOM, not even a `<noscript>`;
* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, sucking up all the class names used;
* Works just as well with isomorphic apps.

## Example

Assuming you use something like [react-router](https://github.com/rackt/react-router):

```javascript
var App = React.createClass({
  render: function () {
    // Add "some class" to the body class name
    return (
      <BodyClassName className='some class'>
        <this.props.activeRouteHandler />
      </BodyClassName>
    );
  }
});

var HomePage = React.createClass({
  render: function () {
    // Now it'll be "some class home"
    return (
      <BodyClassName className='home'>
        <h1>Home, sweet home.</h1>
      </BodyClassName>
    );
  }
});
```

## Server Usage

If you use it on server, call `BodyClassName.rewind()` **after rendering components to string** to retrieve the combined class name. You can then embed this className into HTML page template.

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.
