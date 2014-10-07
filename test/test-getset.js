


var expect = require('expect.js'),
	BitArray = require('../build/js/bitarray');
  if ('undefined' != typeof window) {
    expect = window.expect;
  }
var fixture = [1,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0];
describe('Get Set', function(){
	describe('getters', function(){
		it('should return correct values', function(done){
			var ba = new BitArray(fixture);
			for ( var i = 0; i < 1; i++ ) {
				var rand = Math.floor(Math.random()*fixture.length);
				expect(ba.get(rand)).to.be.eql(fixture[rand]);
			}
			done();
		});
	});
	describe('setters', function(){
		it('should modify the correct values', function(done){
			var tfixture = fixture;
			var ba = new BitArray(tfixture);
			
			for ( var i = 0; i < tfixture.length; i++ ) {
				tfixture[i] = (!tfixture[i])-0;
				expect(ba.set(i, tfixture[i]).toString()).to.be.eql(tfixture.join(""));
			}
			done();
		});
		it('should expand correctly if given larger than the correct size', function(done){
			for ( var i = 29; i < fixture.length; i+=1 ) {
				var tfixture = fixture.slice(0,i);
				var ba = new BitArray(tfixture);
				tfixture.push(0,1);
				expect(ba.set(tfixture.length-1,1).toString()).to.be.eql(tfixture.join(''));
			}
			done();
		});
	});
});