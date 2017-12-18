const express = require('express');
const bodyParser = require('body-parser');
const peers = require('./peers');
const Blockchain = require('./Blockhain');
let sockets = require('./sockets');

const initHttpServer = (port) => {
	var app = express();
	app.use(bodyParser.json());

	app.get('/broadcast', (req, res) => {
		peers.broadcast('Broadcast test');
		res.send();
	});

	app.post('/transactions/new', (req, res) => {
		const sender = req.body.sender;
		const recipient = req.body.recipient;
		const amount = req.body.amount;

		let blockchain = new Blockchain();
		blockchain.new_transaction(sender, recipient, amount);
	});

	app.get('/mine', (req, res) => {

	});

	app.get('/peers', (req, res) => {
		const peerListeners = sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort);
		res.send(peerListeners);
	});
	app.post('/addPeer', (req, res) => {
		peers.connectToPeers([req.body.peer]);
		res.send(`Added ${req.body.peer} to peer list`);
	});
	app.listen((port), () => console.log('Listening http on port: ' + port));
};

module.exports = {
	initHttpServer
};