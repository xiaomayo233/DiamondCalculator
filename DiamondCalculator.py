def cut(i):
	MAX_VALUE = 9223372036854775807;
	MIN_VALUE = -9223372036854775808;
	while (i > MAX_VALUE):
		i = MIN_VALUE + (i - MAX_VALUE)
	while (i < MIN_VALUE):
		i = MAX_VALUE - (MIN_VALUE - i);
	return i;


def cal(seed,cx,cz):
    mul = 25214903917;
    mask = 281474976710655;
    
    ''' 获取i j '''
    temp = seed ^ mul & mask;
    
    first = ((temp * mul + 11) & mask);
    second = ((first * mul + 11) & mask);
    third = ((second * mul + 11) & mask);
    fourth = ((third * mul + 11) & mask);
    
    first >>= 16;
    first <<= 32;
    first = cut(first);
    
    second <<= 16;
    second = cut(second);
    second >>= 32;
    
    third >>= 16;
    third <<= 32;
    third = cut(third);
    
    fourth <<= 16;
    fourth = cut(fourth);
    fourth >>= 32;
    
    i = (first + second) | 1;
    j = (third + fourth) | 1;
    
    ''' 获取坐标 '''
    temp =((16 * cx * i + 16 * cz * j) ^ seed) + 60009;
    
    temp = (temp ^ mul) & mask;
    
    first = (temp * mul + 11) & mask;
    second = (first * mul + 11) & mask;
    
    first >>= 44;
    second >>= 44;
    
    x = (first + 16 * cx);
    z = (second + 16 * cz);
    return {"x": x,"z": z};

print(cal(5241002004345974207,-3,-3))