var expect = require('expect.js'),
	BitArray = require('../build/js/bitarray');
  if ('undefined' != typeof window) {
    expect = window.expect;
  }
var fixture = [1,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0];
fixture=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0];
describe('Logical Operations', function(){
	describe('BitArray#rshift', function(){
		it('should rightshift correctly', function(done) {
			var ba = new BitArray(fixture);
			var tfixture=fixture.slice(0);
			for (var i = 0; i < tfixture.length; i++ ) {
				expect(ba.length).to.be.eql(tfixture.length);
				var tba = new BitArray(ba);

				tfixture.splice(i,0,0);
				tfixture.splice(tfixture.length-1,1);
				// debugger;
				tba.rshift(i+1);
				expect(tba.toString()).to.be(tfixture.join(''));
			}
			done();
		});
	});
	describe('BitArray#lshift', function(){
		it('should leftshift correctly', function(done) {
			var ba = new BitArray(fixture);
			var tfixture=fixture.slice(0);
			for (var i = tfixture.length-1; i >= 0; i-- ) {
				expect(ba.length).to.be.eql(tfixture.length);
				var tba = new BitArray(ba);

				tfixture.splice(tfixture.length-1,0,0);
				tfixture.splice(0,1);
				console.log(tfixture.length-i);
				tba.lshift(tfixture.length-i);
				expect(tba.toString()).to.be(tfixture.join(''));
			}
			done();
		});
	});
});