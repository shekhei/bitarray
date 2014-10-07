


var expect = require('expect.js'),
	BitArray = require('../build/js/bitarray');
  if ('undefined' != typeof window) {
    expect = window.expect;
  }
var bitArrayFixtures = [[0,1],
				[0,1,0,1,0,1],
				[1,1,1,1,1],
				[1,1,1,0,0,0],
				[1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0],
				[1,1,0,0,0,0,1,1,1,0,0,0,1,0,1,0,0,0,1,1,1,1,1,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0]],
	stringFixtures = [];
for (var i = 0; i < bitArrayFixtures.length; i++ ) {
	stringFixtures.push(bitArrayFixtures[i].join(''));
}
describe('Creating', function(){
	function createCases(fixtures){
		return (function(){
			it('should return a correct array', function(done){
				var i;
				for ( i = 0; i < fixtures.length; i++ ) {
					// debugger;
					var ba = new BitArray(fixtures[i]);
					expect(ba.length()).to.be.eql(fixtures[i].length);
					// debugger;
					var baArr = ba.asArr();
					expect(baArr).to.be.an('array');
					expect(baArr.length).to.be.eql(bitArrayFixtures[i].length);
					
					expect(baArr).to.be.eql(bitArrayFixtures[i]);
				}
				done();
			});
			it('should return a correct string', function(done){
				var i;
				for ( i = 0; i < fixtures.length; i++ ) {
					// debugger;
					var ba = new BitArray(fixtures[i]);
					expect(ba.length()).to.be.eql(fixtures[i].length);
					// debugger;
					var baArr = ba.toString();
					expect(baArr).to.be.an('string');

					expect(baArr.length).to.be.eql(stringFixtures[i].length);

					expect(baArr).to.be.eql(stringFixtures[i]);
				}
				done();
			});
		});
	}
	describe('with array of bits', createCases(bitArrayFixtures));
	describe('with bits of string', function(){
		createCases(stringFixtures)();
		it('should not allow incorrect strings', function(done){
			expect(function(){new BitArray('abc');}).to.throwException();
			expect(function(){new BitArray('012');}).to.throwException();
			expect(function(){new BitArray('01a');}).to.throwException();
			expect(function(){new BitArray('e23');}).to.throwException();
			expect(function(){new BitArray('10a');}).to.throwException();
			expect(function(){new BitArray('de$');}).to.throwException();
			done();
		});
	});
});