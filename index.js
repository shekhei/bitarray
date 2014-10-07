// although it operates on 32 bit integers, it seems like i cant quite make use of the full thing, it creates a weird bug
// so i have to stop at 31 bit
var rNotNum = /[^01]/, bitLen=30, mask=(1<<bitLen);
function bitArrayFromStr(str, bitArray) {
	//test if it is a number
	if (rNotNum.test(str) ) { throw "'"+str+"' is not a binary string"; }
	_build(str.split(''), bitArray);
	// TODO see if this is a performance issue later
}
function bitToNum(arr, pos, len) { 
	pos = pos || 0;
	var i, result = 1;
	for ( i = 0; i < bitLen && pos < arr.length; i++, pos++ ) {
		result = (result << 1) + !!(arr[pos]-0);
	}
	return result;
}
function BitArray(initVal) {
	this.vals = [];
	if ( typeof initVal === "string" ) {
		bitArrayFromStr(initVal, this);
	} else if ( Array.isArray(initVal) ) {
		//this.vals = new Array(initVal.length/32);
		_build(initVal, this);
	}
}
function _offset(val) {
	if (undefined === val ) { return bitLen; }
	var j = 0;
	while ((((val>>>0)&(mask >>>j)) != (mask >>> j)) && j < bitLen){j++};
	return j+1;
}
function _build(initVal, bitArray) {
	var i;
	for ( i = 0; i < initVal.length; i+=bitLen ) {
		bitArray.vals.push(bitToNum(initVal, i));
	}
}
BitArray.prototype.asArr = function(){
	var result = [], t, j, i;
	for ( i = 0; i < this.vals.length; i++ ) {
		t = this.vals[i];
		j=_offset(t);
		for ( ; j <= bitLen; j++ ) {
			result.push((((t>>>0)&(mask>>>j)) === (mask>>>j))-0);
		}
	}
	return result;
};
function noop() { throw "this is not implemented"; }
BitArray.prototype.toString = function(){
	return this.asArr().join('');
};
BitArray.prototype.get = function(i){
	var v=this.vals[Math.floor(i/bitLen)], o = _offset(v), m = mask>>>(o+(i%bitLen));
	return ((v&m) === m);
};
BitArray.prototype.at = BitArray.prototype.get;
BitArray.prototype.length = function(){
	return Math.max((this.vals.length-1)*bitLen,0)+(bitLen-(_offset(this.vals[this.vals.length-1])-1));
}
BitArray.prototype.size = BitArray.prototype.length;
BitArray.prototype.set = function(i,val){
	var p = (i/bitLen)|0, v=this.vals[p], o = _offset(v), index=o+(i%bitLen), val=!!val, shift=bitLen-index;
	if ( v === undefined ) {
		// now lets left shift all the way for the previous last value
		var _v = this.vals[this.vals.length-1];
		_v <<= (_offset(_v)-1);
		this.vals[this.vals.length-1] = _v;
		while ( this.vals.length < p ) {this.vals.push(mask);}
		v = 1;
		shift=index-(bitLen-1);
		v<<=shift;
		shift=0;
	}
	if ( shift < 0 ) {
		// the current value can hold it, however, it is larger than the current size
		// shift becomes 0 because that would put it in the beginning;
		v <<= (-shift);
		shift = 0;
	}
	// if ( index > bitLen ) {
	// 	debugger;	
	// 	var c = ((index-bitLen)/bitLen)|0, fills = [p,0], _p = p;
	// 	while ( c-- > 0 ) { fills.push(mask);_p++;}
	// 	this.vals.splice.apply(this.vals, fills);
	// 	p = _p;
	// 	v = (v<<((index-bitLen)%bitLen)) + val;
	// } else {
		var nm = (val<<shift);
		v = v&((0xffffffff^(1<<shift))>>>0)|nm;
		// now lets figure out what is the value to add or subtract
		// if this is just within the normal length, things is simple
	// }
	this.vals[p] = v;

	return this;
}
BitArray.prototype.at = noop;

BitArray.prototype.xor = noop;
BitArray.prototype.or = noop;
BitArray.prototype.and = noop;