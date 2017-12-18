const express = require('express');
const bodyParser = require('body-parser');
const sockets = require('./sockets');
const peers = require('./peers');

function initHttpServer (port) {
	let app = express();

	app.use(bodyParser.json());

	app.get('/peers', (req, res) => {
		// console.log('Sockets: ', sockets);
		const socketsMap = sockets.map((socket) => {
			console.log('Adress: ', socket._socket.remoteAddress);
			return socket._socket.remoteAddress + ':' + socket._socket.remotePort;
		});
		res.send(socketsMap);
	});

	app.post('/addPeer', (req, res) => {
		const peersArray = [req.body.peer];
		console.log('Peers array: ', peersArray);
		peers.connectToPeers(peersArray);
		res.send();
	});

	app.post('/broadcast', (req, res) => {
		const message = req.body.message;
		peers.broadcast(message);
		res.send();
	});
	app.listen(port, () => {
		console.log(`Listening on http port ${port}`);
	});
}

module.exports = {
	initHttpServer
};