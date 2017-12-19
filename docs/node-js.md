# Node help

## ECMAscript

In general people use ECMAscript to add better syntax to JavaScript projects, and improved functionality.

## Arrow functions

An **arrow function** is just like a default javascript function, but with a slightly different syntax. It's mostly used within other functions, and not to declare a function:

```javascript
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

**Regular function:**

```javascript
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```

## var, let and const

**var** is the way to declare a variable, which are subject to change.

**let** is the "new" ECMAscript way of doing this.

An example of **var** or **let** could be:

```javascript
let counter = 0;
while(counter < 10) {counter++;}
```

**const** is the way to declare a variable, which are NOT subject to change. This makes it easier for you later, or other developers, to know that the variable are not going to på manipulated later.

An example of **const** could be:

```javascript
const subModuleRequirement = require('iAmASubModule');
```

## Require

Using require is the way you add modules to a module. This can be used to inject both module-dependencies from NPM registry, but also local modules.

Usually you declare these as a **const** as they most likely are not going to be manipulated/changed.

```javascript
// load from dependecies - node_modules folder
const express = require('express');
// load local module
const indexRouter = require('./routes/index.js');
```

## module.exports

[https://www.sitepoint.com/understanding-module-exports-exports-node-js/](https://www.sitepoint.com/understanding-module-exports-exports-node-js/).

module.exports is the way to export content of one file to another. 

**foo.js**

```javascript
let fooArray = [];
module.exports = fooArray;
```

**bar.js**

```javascript
let fooArray = require('./foo');
fooArray.push('bar');
console.log(fooArray);
// [ 'bar' ]
```