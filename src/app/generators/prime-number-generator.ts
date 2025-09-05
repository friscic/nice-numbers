import { NumberPatternGenerator } from './number-pattern-generators-base';

export class PrimeNumberGenerator extends NumberPatternGenerator {
    private prime = 2;
    generate(digitCount: number): string {
        // Choose a pattern type: repeated, mirrored, sequential
        const patternType = Math.floor(Math.random() * 3);
        let candidate = '';
        switch (patternType) {
            case 0: // repeated
                const digit = Math.floor(Math.random() * 9) + 1;
                candidate = digit.toString().repeat(digitCount);
                break;
            case 1: // mirrored
                let half = '';
                for (let i = 0; i < Math.ceil(digitCount / 2); i++) {
                    half += Math.floor(Math.random() * 10).toString();
                }
                candidate =
                    half +
                    half
                        .split('')
                        .reverse()
                        .join('')
                        .slice(0, digitCount - half.length);
                break;
            case 2: // sequential
                const start = Math.floor(Math.random() * (10 - digitCount));
                for (let i = 0; i < digitCount; i++) {
                    candidate += ((start + i) % 10).toString();
                }
                break;
        }
        // Find the next prime with this pattern
        let num = parseInt(candidate, 10);
        while (!this.isPrime(num)) num++;
        this.prime = num + 1;
        return num.toString();
    }
    override reset(): void {
        this.prime = 2;
    }
    private isPrime(n: number): boolean {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }
}
