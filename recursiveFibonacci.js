function recursiveFibonacci(n) {
	var res = 0;
	function loop(n, a, b) {
		res = a+b
		if (n <= 0) 
			return res;
		else
			loop(n-1, b, a+b); 
	}
	loop(n, 0, 1);
	return res;
}
recursiveFibonacci(6);
// => 21 (out of [1,1,2,3,5,8,13,21,34,55,89,144,..]
