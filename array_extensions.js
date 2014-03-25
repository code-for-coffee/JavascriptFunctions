// Array() extensions
// written by @code4coffee 2014-3-24
//
// array.last();
// Adds an array.last(); function
if (!Array.prototype.last) {
	Array.prototype.last = function () {
		return this[this.length - 1];
	};
};