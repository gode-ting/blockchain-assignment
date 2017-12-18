/* global describe, it, before*/
const chai = require('chai');
const expect = chai.expect;

const Blockchain = require('../src/Blockhain');

describe('src/Blockchain.js', () => {
	let _Blockchain;
	before(() => {
		_Blockchain = new Blockchain();
	});
	describe('class Blockchain', () => {
		describe('when new Blockchain initialized', () => {
			let actual;
			before(() => {
				actual = _Blockchain;
			});
			it('should return a new object, which includes a property chain that is an array', () => {
				expect(actual).to.have.property('chain');
				expect(actual['chain']).to.be.an('array');
			});
		});
	});
});