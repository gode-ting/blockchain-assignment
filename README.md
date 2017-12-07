# blockchain-assignment

Repository for blockchain assignment (subject 12) in our system integration course, PBA software development at cphbusiness

## Commands

Any of these commands should be run from a terminal where current working directory in the terminal is the root of the project.

`npm i`/`npm install`: should be run first time you work with the project, or if you're missing dependencies someone else added to package.json.

`npm run dev`: start a node server in development. That is, Nodemon will run it and restart automatically when changes are made.

`npm run start`: start a node server. Should be used for production.

`npm run test`: Runs specified mocha tests (none setup yet)

## Node help

### ECMAscript

In general people use ECMAscript to add better syntax to JavaScript projects, and improved functionality.

### Arrow functions

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

### var, let and const

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

### Require

Using require is the way you add modules to a module. This can be used to inject both module-dependencies from NPM registry, but also local modules.

Usually you declare these as a **const** as they most likely are not going to be manipulated/changed. 

```javascript
// load from dependecies - node_modules folder
const express = require('express');
// load local module
const indexRouter = require('./routes/index.js');
```