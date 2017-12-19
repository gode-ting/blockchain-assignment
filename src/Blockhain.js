const sha256 = require('sha256');

module.exports = class Blockchain {
	constructor() {
		this.chain = [{
			'index': 1,
			'timestamp': new Date().toLocaleString,
			'transactions': 'empty',
			'proof': '100',
			'previous_hash': '1'
		}];
		this.current_transactions = [];
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

	new_transaction (sender, recipient, amount) {
		this.current_transactions.push({
			sender,
			recipient,
			amount
		});
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
	hash_block(block) {
        return sha256(JSON.stringify(block))
	}
	
	
};