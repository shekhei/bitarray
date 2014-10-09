


var expect = require('expect.js'),
	BitArray = require('../build/js/bitarray');
  if ('undefined' != typeof window) {
    expect = window.expect;
  }
var fixture = [1,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0];
describe('Array Operations', function(){
	describe('slice', function(){
		it('should return the correct slice without modifying itself', function(done){
			var ba = new BitArray(fixture);
			var newBa = ba.slice(5,50);
			expect(ba.asArr()).to.be.eql(fixture);
			expect(newBa.asArr()).to.be.eql(fixture.slice(5,50));
			done();
		});
	});
});