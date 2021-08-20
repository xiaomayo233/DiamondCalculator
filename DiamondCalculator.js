function cal(seed,cx,cz){
	if (seed == null || cx == null || cz == null) {
		throw new Error("invalid data");
	}
	
	seed = BigInt(seed);
	cx = BigInt(cx);
	cz = BigInt(cz);
	
	var mul = BigInt(25214903917);
	var mask = BigInt(281474976710655);
	
	var temp = BigInt(seed);
	/* 获取i j */
	var temp = (seed ^ mul) & mask;
	var first = ((temp * mul + 11n) & mask);
	var second = ((first * mul + 11n) & mask);
	var third = ((second * mul + 11n) & mask);
	var fourth = ((third * mul + 11n) & mask);
	
	first >>= 16n;
	first <<= 32n;
	
	second <<= 16n;
	second >>= 32n;
	
	third >>= 16n;
	third <<= 32n;
	
	fourth <<= 16n;
	fourth >>= 32n;
	
	var i = (first + second) | 1n;
	var j = (third + fourth) | 1n;
	
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

console.log(cal(123,1,2));