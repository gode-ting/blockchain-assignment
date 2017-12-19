const sha256 = require('sha256');

module.exports = class Blockchain {
	constructor() {
		this.chain = [];
		this.current_transactions = [];
		this.create_genesis_block();
	}

	create_genesis_block() {
		this.chain.push({
			'index': 1,
			'timestamp': new Date().toLocaleString,
			'transactions': 'empty',
			'proof': '100',
			'previous_hash': '1'
		});
	}

	new_block (proof, previous_hash) {
		var block = {
			'index': this.chain.length + 1,
			'timestamp': new Date().toLocaleString(),
			'transactions': this.current_transactions,
			'proof': proof,
			'previous_hash': previous_hash
		};
		this.current_transactions = [];
		this.chain.push(block);

		return block;
	}

	mine () {
		var last_block = this.last_block()
		var last_proof = last_block.proof
		var proof = this.proof_of_work(last_proof)
		var previous_hash = this.hash_block(last_block)
	
		this.new_transaction("Mine reward", "Unknown worker", 1)
	
		return this.new_block(proof, previous_hash)
	}

	new_transaction (transaction) {
		this.current_transactions.push(transaction);
		return this.chain.length + 1;
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

	pending_transactions () {
		console.log(this,current_transactions)
		return this.current_transactions;
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