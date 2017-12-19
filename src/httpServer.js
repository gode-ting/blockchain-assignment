const express = require('express');
const bodyParser = require('body-parser');
const peerServer = require('./peerServer');
const Blockchain = require('./Blockhain');
let sockets = require('./sockets');

const initHttpServer = (port) => {
	var app = express();
	app.use(bodyParser.json());

	app.get('/broadcast', (req, res) => {
		peerServer.broadcast('Broadcast test');
		res.send();
	});

	app.post('/transactions/new', (req, res) => {
		const sender = req.body.sender;
		const recipient = req.body.recipient;
		const amount = req.body.amount;

		let blockchain = new Blockchain();
		blockchain.new_transaction(sender, recipient, amount);
		res.json({status: 'success', transaction: JSON.stringify(blockchain)});
	});

	var myBC = new Blockchain();
	app.get('/mine', (req, res) => {
		var last_block = myBC.last_block()
		var last_proof = last_block.proof
		var proof = myBC.proof_of_work(last_proof)
		var previous_hash = myBC.hash_block(last_block)
	
		myBC.new_transaction("Mine reward", "Unknown worker", 1)
	
		myBC.new_block(proof, previous_hash)
	
		res.send('Block added!')
		console.log("-------------------")
		console.log(myBC.chain)
	});

	app.get('/peers', (req, res) => {
		const peerListeners = sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort);
		res.send(peerListeners);
	});
	app.post('/addPeer', (req, res) => {
		peerServer.connectToPeers([req.body.peer]);
		res.send(`Added ${req.body.peer} to peer list`);
	});
	app.listen((port), () => console.log(`Listening http on port:${port}`));

	
	app.get('/chain', function (req, res) {
    	response = {
        'chain': myBC.chain,
        'length': myBC.chain.length
    	}
    	res.send(JSON.stringify(response))

	})
};

module.exports = {
	initHttpServer
};