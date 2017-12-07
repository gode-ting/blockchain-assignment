const express = require('express');
const cnf = require('cnf');

// Routes
const indexRoute = require('./routes/index.js');

function main() {
	const app = express();

	app.use('/', indexRoute);

	// process.env.PORT is specified in production, else use port from config (for dev)
	const port = process.env.PORT || cnf.http.port;

	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
}

module.exports = {
	main
}