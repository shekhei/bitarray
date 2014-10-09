// although it operates on 32 bit integers, it seems like i cant quite make use of the full thing, it creates a weird bug
// so i have to stop at 31 bit
/* jshint -W018  */
/* jshint -W087 */
var rNotNum = /[^01]/, bitLen=31, mask=(1<<bitLen-1);
function bitArrayFromStr(str, bitArray) {
	//test if it is a number
	if (rNotNum.test(str) ) { throw "'"+str+"' is not a binary string"; }
	_build(str.split(''), bitArray);
	// TODO see if this is a performance issue later
}
function bitToNum(arr, pos, len) { 
	pos = pos || 0;
	var i, result = 0;
	for ( i = 0; i < bitLen && pos < arr.length; i++, pos++ ) {
		result += (!!(arr[pos]-0)) << (bitLen-i-1);
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
	} else if ( initVal instanceof BitArray ) {
		this.length = initVal.length;
		this.vals = initVal.vals.slice(0);
	}
}
function _build(initVal, bitArray) {
	var i;
	for ( i = 0; i < initVal.length; i+=bitLen ) {
		bitArray.vals.push(bitToNum(initVal, i));
	}
	bitArray.length = initVal.length;
}
BitArray.fn = {};
BitArray.fn.asArr = function(){
	var result = [], t, j, i;
	for ( i = 0; i < this.vals.length-1; i++ ) {
		t = this.vals[i];
		j=0;
		for ( ; j < bitLen; j++ ) {
			result.push((((t>>>0)&(mask>>>j)) === (mask>>>j))-0);
		}
	}
	t = this.vals[this.vals.length-1];
	j = 0;
	var max = this.length%bitLen || bitLen;
	for ( ; j < max; j++ ) {
		result.push((((t>>>0)&(mask>>>j)) === (mask>>>j))-0);
	}
	return result;
};
function noop() { throw "this is not implemented"; }
BitArray.fn.toString = function(){
	return this.asArr().join('');
}; 
BitArray.fn.at = function(i){
	var v=this.vals[Math.floor(i/bitLen)], m = mask>>>(i%bitLen);
	return ((v&m) === m);
};
BitArray.fn.size = function _size() { return this.length; };
BitArray.fn.set = function(i,_val){
	var p = (i/bitLen)|0, v=this.vals[p], m=i%bitLen, index=m, val=!!_val, shift=bitLen-index-1;
	if ( v === undefined ) {
		while ( this.vals.length < p ) {this.vals.push(0);}
		v = 0;
	}
	// if ( shift < 0 ) {
	// 	// the current value can hold it, however, it is larger than the current size
	// 	// shift becomes 0 because that would put it in the beginning;
	// 	v <<= (-shift);
	// 	this.length -= shift;
	// 	shift = 0;
	// }
	// if ( index > bitLen ) {
	// 	debugger;	
	// 	var c = ((index-bitLen)/bitLen)|0, fills = [p,0], _p = p;
	// 	while ( c-- > 0 ) { fills.push(mask);_p++;}
	// 	this.vals.splice.apply(this.vals, fills);
	// 	p = _p;
	// 	v = (v<<((index-bitLen)%bitLen)) + val;
	// } else {
		var nm = (val<<shift);
		v = v&((-1^(1<<shift))>>>0)|nm;
		this.length = Math.max(this.length, i+1);
		// now lets figure out what is the value to add or subtract
		// if this is just within the normal length, things is simple
	// }
	this.vals[p] = v;
	return this;
};

BitArray.fn.xor = noop;
BitArray.fn.or = noop;
BitArray.fn.and = noop;
BitArray.fn.not = noop;
BitArray.fn.lshift = function _lshift(count){
	var i;
	if ( count > 0 ) {
		if ( count >= this.length ) {
			for ( i = 0; i < this.vals.length; i++ ) {
				this.vals[i] = 0;
			}
		} else if ( this.vals.length ) {
			if(count>=18){debugger;}
			// lets first do a clean up on the lsb of the lowest bucket
			var l = this.vals.length, q = (count/bitLen)|0, m = count%bitLen, t, mask = ~((1<<(m-1))-1), significantBits=this.length%bitLen, clearBits = bitLen - significantBits;
			i=0;
			this.vals[l-1] = (this.vals[l-1]&(~((1<<clearBits)-1))>>>0);
			
			// this is important, to copy from the back
			// and to start from the last one
			// and also when it is skipped cases, should handle the skippable ones first
			for(i=0;i<l-q-1;i++) {
				this.vals[i] = (this.vals[i+q+1] & mask)>>>(bitLen-m)|((this.vals[i+q] << m) >>>0);
			}
			i=q+1;
			this.vals[i] = (this.vals[i+q] << m)>>>0;
			i++;
			if ( i < l ) {
				for(;i<l;i++) {
					this.vals[i] = 0;
					// these should just 
				}
			}
		}
	}
	return this; 
};
BitArray.fn.rshift = function _rshift(count){
	// special case
	var i = 0;
	if ( count > 0 ) {
		if ( count >= this.length ) {
			for ( i = 0; i < this.vals.length; i++ ) {
				this.vals[i] = 0;
			}
		} else if ( this.vals.length ) {
			var q = (count/bitLen)|0, m = count%bitLen, l = this.vals.length, t, mask = ~(0xffffffff<<m);
			i = l-1;
			// this is important, to copy from the back
			// and to start from the last one
			// and also when it is skipped cases, should handle the skippable ones first
			for(;i>q;i--) {
				this.vals[i] = ((this.vals[i-q-1] &mask)<<(bitLen-m))|(this.vals[i-q] >>> m);
			}
			i=q;
			this.vals[i] = this.vals[i-q] >>> m;
			i--;
			if ( i >= 0 ) {
				for(;i>=0;i--) {
					this.vals[i] = 0;
					// these should just 
				}
			}
		}
	}
	return this;
};
BitArray.fn.charAt = BitArray.fn.at;
BitArray.fn.slice = function _slice(){
	//lets first create a very naive version
	return new BitArray([].slice.apply(this.asArr(), arguments));
};

BitArray.prototype = BitArray.fn;