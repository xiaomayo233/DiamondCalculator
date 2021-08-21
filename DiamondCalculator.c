#include <stdio.h>

struct Position{
	long x;
	long z;
};

struct Position cal(long long seed,int cx,int cz);

int main(){
	long long seed = 5241002004345974207L;
	long long cx = -3;
	long long cz = -3;
	struct Position m = cal(seed,cx,cz);
	int x = m.x;
	int z = m.z;
	printf("x = %d,z = %d",x,z);
}

void cut(long long &i){
	long long int MAX_VALUE = 9223372036854775807L;
	long long int MIN_VALUE = -9223372036854775808L;
	while (i > MAX_VALUE)
		i = MIN_VALUE + (i - MAX_VALUE);
	while (i < MIN_VALUE)
		i = MAX_VALUE - (MIN_VALUE - i);
}
struct Position cal(long long seed,int cx,int cz){
	long long mul = 25214903917L;
	long long mask = 281474976710655L;
	
	/* 获取i j */
	long long temp = seed ^ mul & mask;
	long long first = ((temp * mul + 11) & mask);
	long long second = ((first * mul + 11) & mask);
	long long third = ((second * mul + 11) & mask);
	long long fourth = ((third * mul + 11) & mask);
	
	first >>= 16;
	first <<= 32;
	cut(first);
	
	second <<= 16;
	cut(second);
	second >>= 32;
	
	third >>= 16;
	third <<= 32;
	cut(third);
	
	fourth <<= 16;
	cut(fourth);
	fourth >>= 32;
	
	
	long long i = (first + second) | 1;
	long long j = (third + fourth) | 1;
	
	/* 获取坐标 */
	temp =((16 * cx * i + 16 * cz * j) ^ seed) + 60009;
	
	temp = (temp ^ mul) & mask;
	
	first = (temp * mul + 11) & mask;
	second = (first * mul + 11) & mask;
	
	first >>= 44;
	second >>= 44;
	
	long x = (first + 16 * cx);
	long z = (second + 16 * cz);
	struct Position ret = {x,z};
	return ret;
}