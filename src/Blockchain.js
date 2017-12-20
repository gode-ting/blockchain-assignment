const sha256 = require('sha256');
const aSyncRequest = require('request');

module.exports = class Blockchain {
	constructor(nodes) {
		this.chain = [];
		this.current_transactions = [];
		this.nodes = nodes;

	}

	new_block (proof, previous_hash) {
		var block = {
			'index': this.chain.length + 1,
			'timestamp': new Date().toLocaleString(),
			'transactions': JSON.stringify(this.current_transactions),
			'proof': proof,
			'previous_hash': previous_hash
		};
		this.current_transactions = [];
		this.chain.push(block);

		return block;
	}

	new_transaction (transaction) {
		this.current_transactions.push(transaction);
	}

	last_block () {
		return this.chain[this.chain.length - 1];
	}

	proof_of_work () {
		var proof = 0;
		while (!this.valid_proof(this.chain[this.chain.length - 1].proof, proof)) {
			proof += 1;
		}

		return proof;
	}

	valid_proof (last_proof, proof) {
		var guess = '' + last_proof + proof;
		var hashed_guess = sha256(guess);
		return hashed_guess.substr(hashed_guess.length - 1) === '0';
	}

	register_node (address) {
		this.nodes.push(address);
	}

	valid_chain (chain) {
		var last_block = chain[0];
		var current_index = 1;

		while (current_index < chain.length) {

			var block = chain[current_index];
			if (block.previous_hash !== this.hash_block(last_block)) {
				return false;
			}

			if (!this.valid_proof(last_block.proof, block.proof)) {
				return false;
			}
			last_block = block;
			current_index += 1;
		}
		return true;
	}

	backtrack_transactions (otherChain) {
		var index = this.chain.length - 1;
		var blockAmount = 0;
		var thisBlockchain = this;
		while (index > -1) {
			if (sha256(JSON.stringify(this.chain[index])) === sha256(JSON.stringify(otherChain.chain[index]))) {
				var newIndex = 0;
				var pointer = this.chain.length - 1;
				while (newIndex < blockAmount) {
					var trans = JSON.parse(this.chain[pointer - newIndex].transactions);
					trans.forEach(function (element) {
						thisBlockchain.current_transactions.push(element);
					});
					console.log('here: ' + trans);
					console.log('length: ' + trans.length);
					newIndex += 1;
				}
				console.log('new trans: ' + JSON.stringify(this.current_transactions));
				return true;
			} else {
				index -= 1;
				blockAmount += 1;
			}
		}
	}

	resolve_conflicts () {
		var max_length = this.chain.length;
		var myBlockChain = this;
		console.log('Making /chain calls too: ' + JSON.stringify(this.nodes));

		this.nodes.forEach(function (element) {
			console.log('Calling (async): ' + element);
			aSyncRequest(element + '/chain', function (error, response, body) {
				if (response && response.statusCode === 200) {
					var blockchain = JSON.parse(body);
					var length = blockchain.length;
					var otherChain = blockchain.chain;

					// var y = myBlockChain.valid_chain(otherChain);

					if (length > max_length && myBlockChain.valid_chain(otherChain)) {
						console.log('Chain is different');

						myBlockChain.backtrack_transactions(blockchain);

						max_length = length;
						myBlockChain.chain = otherChain;

						console.log('Making /resolve calls too: ' + JSON.stringify(this.nodes));
						myBlockChain.nodes.forEach(function (element) {
							console.log('Calling (async): ' + element);
							aSyncRequest(element + '/nodes/resolve', function (error, response, body) {
								console.log('Recieved async answer from: ' + element);
							});
						});
						return true;

					} else {
						console.log('Chain is not different');
					}
				}
				console.log('Recieved async answer from: ' + element);
			});
			console.log('No more changes. finishing...');
			return false;
		});
	}

	compare (a, b) {
		var combinedInfoA = a.sender + a.recipient + a.amount + '';
		var combinedInfoB = b.sender + b.recipient + b.amount + '';
		return combinedInfoA.localeCompare(combinedInfoB);
	}

	hash_block (block) {
		return sha256(JSON.stringify(block));
	}
};
//var res = request('GET', 'http://localhost:3001/chain')
