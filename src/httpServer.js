const express = require('express');
const bodyParser = require('body-parser');
const peerServer = require('./peerServer');
const Blockchain = require('./Blockhain');
let sockets = require('./sockets');

const initHttpServer = (port) => {
	var app = express();
	app.use(bodyParser.json());

	var myBC = new Blockchain();

	app.get('/broadcast', (req, res) => {
		peerServer.broadcast('Broadcast test');
		res.send();
	});

	app.post('/transactions/new', (req, res) => {
		const index = myBC.new_transaction({
			'sender' : req.body.sender,
			'recipient' : req.body.recipient,
			'amount' : req.body.amount
		});
		
		res.json({status: 'success', message: `new pending transaction will be added to block id ${index}`});
	});

	app.get('/transactions/pending', function (req, res) {
    	res.send({
        	'pending_transactions': myBC.current_transactions,
        	'length': myBC.current_transactions.length
    	})
	});
	
	app.get('/mine', (req, res) => {
		const new_block = myBC.mine()
		res.json({status: 'block added', block: new_block});
	});

	app.get('/peers', (req, res) => {
		const peerListeners = sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort);
		res.send(peerListeners);
	});

	app.post('/addPeer', (req, res) => {
		peerServer.connectToPeers([req.body.peer]);
		res.send(`Added ${req.body.peer} to peer list`);
	});

	app.get('/chain', function (req, res) {
    	res.send({
        	'chain': myBC.chain,
        	'length': myBC.chain.length
    	})
	});

	app.listen((port), () => console.log(`Listening http on port:${port}`));
};

module.exports = {
	initHttpServer
};