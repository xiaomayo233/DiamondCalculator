function cut(i){
	MAX_VALUE = BigInt("9223372036854775807");
	MIN_VALUE = BigInt("-9223372036854775808");
	while (i > MAX_VALUE) {
		i = MIN_VALUE + (i - MAX_VALUE)
	}
	while (i < MIN_VALUE) {
		i = MAX_VALUE - (MIN_VALUE - i);
	}
	return i;
}
function cal(seed,cx,cz){
	if (seed == null || cx == null || cz == null) {
		throw new Error("invalid data");
	}
	
	seed = BigInt(seed);
	cx = BigInt(cx);
	cz = BigInt(cz);
	
	var mul = BigInt("25214903917");
	var mask = BigInt("281474976710655");
	
	var temp = seed ^ (mul & mask);

	var first = cut((temp * mul + 11n) & mask);
	var second = ((first * mul + 11n) & mask);
	var third = ((second * mul + 11n) & mask);
	var fourth = ((third * mul + 11n) & mask);
	
	/* 获取i j */
	first >>= 16n;
	console.log(first);
	first <<= 32n;
	first = cut(first);
	
	second <<= 16n;
	second = cut(second);
	second >>= 32n;
	
	third >>= 16n;
	third <<= 32n;
	third = cut(third);
	
	fourth <<= 16n;
	fourth = cut(fourth);
	fourth >>= 32n;
	
	
	console.log(first);

	var i = cut(first + second) | 1n;
	var j = cut(third + fourth) | 1n;

	/* 获取坐标 */
	temp =((16n * cx * i + 16n * cz * j) ^ seed) + 60009n;
	
	temp = (temp ^ mul) & mask;
	
	first = (temp * mul + 11n) & mask;
	second = (first * mul + 11n) & mask;
	
	first >>= 44n;
	second >>= 44n;
	
	var x = (first + 16n * cx);
	var z = (second + 16n * cz);
	return {x: parseInt(x), z: parseInt(z)};
}

console.log(cal("5241002004345974207","-3","-3"));