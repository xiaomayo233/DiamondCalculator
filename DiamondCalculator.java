import java.util.HashMap;
import java.util.Map;

public class DiamondCalculator{
	public static void main(String[] args){
		DiamondCalculator cal = new DiamondCalculator();
		System.out.println(cal.get(5241002004345974207L,-3,-3));
	}
	public Map<String,Long> get(long seed,int cx,int cz){
		long mul = 25214903917L;
		long mask = 281474976710655L;
		
		/* 获取i j */
		long temp = seed ^ (mul & mask);

		long first = ((temp * mul + 11) & mask);
		long second = ((first * mul + 11) & mask);
		
		long third = ((second * mul + 11) & mask);
		long fourth = ((third * mul + 11) & mask);
		
		first >>= 16;
		first <<= 32;
		
		second <<= 16;
		second >>= 32;
		
		third >>= 16;
		third <<= 32;
		
		fourth <<= 16;
		fourth >>= 32;

		long i = (first + second) | 1;
		long j = (third + fourth) | 1;
		
		/* 获取坐标 */
		temp =((16 * cx * i + 16 * cz * j) ^ seed) + 60009;
		
		temp = (temp ^ mul) & mask;
		
		first = (temp * mul + 11) & mask;
		second = (first * mul + 11) & mask;
		
		first >>= 44;
		second >>= 44;
		
		long x = (first + 16 * cx);
		long z = (second + 16 * cz);
		Map<String,Long> ret = new HashMap<>();
		ret.put("x",x);
		ret.put("z",z);
		return ret;
	}
}