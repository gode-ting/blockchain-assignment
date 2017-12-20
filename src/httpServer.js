const express = require('express');
const bodyParser = require('body-parser');
// const peerServer = require('./peerServer');
const Blockchain = require('./Blockchain');

const initHttpServer = (port) => {
	var app = express();
	app.use(bodyParser.json());

	var myBC = new Blockchain();

	app.get('/', (req, res) => res.send('Hello World!'));

	app.post('/transactions/new', function (req, res) {
		myBC.new_transaction(req.body.sender, req.body.recipient, req.body.amount);
		console.log(myBC.current_transactions);
		res.send('transaction added!');
	});

	app.get('/mine', function (req, res) {
		var last_block = myBC.last_block();
		var last_proof = last_block.proof;
		var proof = myBC.proof_of_work(last_proof);
		var previous_hash = myBC.hash_block(last_block);

		myBC.new_transaction('Mine reward', 'Unknown worker', 1);

		myBC.new_block(proof, previous_hash);

		res.send('Block added!');
	});

	app.get('/createGenesis', function (req, res) {
		var block = {
			'index': 0,
			'timestamp': new Date().toLocaleString,
			'transactions': 'empty',
			'proof': 'proof',
			'previous_hash': 'Genesis'
		};

		myBC.chain.push(block);

		res.send('Genesis added');

	});

	app.get('/chain', function (req, res) {
		const response = {
			'chain': myBC.chain,
			'length': myBC.chain.length,
			'transactions': myBC.chain.current_transactions
		};
		res.send(JSON.stringify(response));

	});

	app.post('/nodes/register', function (req, res) {
		var nodes = req.body.nodes;
		nodes.forEach(function (element) {
			myBC.register_node(element);
		});

		const mes = {
			'message': 'New nodes have been added',
			'total_nodes': myBC.nodes.length
		};

		res.send(JSON.stringify(mes));
	});

	app.get('/nodes/resolve', function (req, res) {
		let replaced = myBC.resolve_conflicts();
		let response;
		if (replaced) {
			response = {
				'message': 'Our chain was replaced',
				'new_chain': myBC.chain
			};
		} else {
			response = {
				'message': 'Our chain is authoritative',
				'chain': myBC.chain
			};
		}

		res.send(JSON.stringify(response));

	});

	app.listen((port), () => console.log(`Listening http on port:${port}`));
};

module.exports = {
	initHttpServer
};