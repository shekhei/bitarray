


var expect = require('expect.js'),
	BitArray = require('../build/js/bitarray');
  if ('undefined' != typeof window) {
    expect = window.expect;
  }
var fixture = [1,1,1,0,0,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0];
describe('Get Set', function(){
	describe('getters', function(){
		it('should return correct values(at)', function(done){
			var ba = new BitArray(fixture);
			for ( var i = 0; i < fixture.length; i++ ) {
				expect(ba.at(i)).to.be.eql(fixture[i]);
			}
			done();
		});
		it('should return correct values(charAt)', function(done){
			var ba = new BitArray(fixture);
			for ( var i = 0; i < fixture.length; i++ ) {
				expect(ba.charAt(i)).to.be.eql(fixture[i]);
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
				// debugger;
				expect(ba.set(i, tfixture[i]).toString()).to.be.eql(tfixture.join(""));
			}
			done();
		});
		it('should expand correctly if given larger than the correct size', function(done){
			for ( var i = 29; i < fixture.length; i+=1 ) {
				// debugger;
				var tfixture = fixture.slice(0,i);
				var ba = new BitArray(tfixture);
				tfixture.push(0,1);
				// debugger;
				expect(ba.set(tfixture.length-1,1).toString()).to.be.eql(tfixture.join(''));
				expect(ba.length).to.be.eql(tfixture.length);
			}
			done();
		});
	});
});