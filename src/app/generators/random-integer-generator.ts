import { NumberPatternGenerator } from './number-pattern-generators-base';

export type RandomIntMode =
  | 'default'
  | 'digit-by-digit'
  | 'shuffled'
  | 'patterned'
  | 'biased-low'
  | 'biased-high'
  | 'palindrome'
  | 'prime'
  | 'random-walk'
  | 'sparse';

export class RandomIntegerGenerator extends NumberPatternGenerator {
    generate(digitCount: number, mode: RandomIntMode = 'default'): string {
        switch (mode) {
            case 'digit-by-digit':
                return this.digitByDigit(digitCount);
            case 'shuffled':
                return this.shuffledDigits(digitCount);
            case 'patterned':
                return this.patternedRandom(digitCount);
            case 'biased-low':
                return this.biasedRandom(digitCount, 'low');
            case 'biased-high':
                return this.biasedRandom(digitCount, 'high');
            case 'palindrome':
                return this.palindromicRandom(digitCount);
            case 'prime':
                return this.primeRandom(digitCount);
            case 'random-walk':
                return this.randomWalk(digitCount);
            case 'sparse':
                return this.sparseRandom(digitCount);
            case 'default':
            default:
                return this.defaultRandom(digitCount);
        }
    }

    private defaultRandom(digitCount: number): string {
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        let value = Math.floor(Math.random() * 1000000000);
        if (value < min) {
            value = min + (value % (max - min + 1));
        }
        if (value > max) {
            value = min + (value % (max - min + 1));
        }
        return value.toString();
    }

    private digitByDigit(digitCount: number): string {
        let digits = [Math.floor(Math.random() * 9) + 1];
        for (let i = 1; i < digitCount; i++) {
            digits.push(Math.floor(Math.random() * 10));
        }
        return digits.join('');
    }

    private shuffledDigits(digitCount: number): string {
        let pool = Array.from({length: 10}, (_, i) => i);
        // Ensure first digit is not zero
        pool = pool.filter(d => d !== 0);
        let digits = [];
        for (let i = 0; i < digitCount; i++) {
            if (pool.length === 0) pool = Array.from({length: 10}, (_, i) => i);
            const idx = Math.floor(Math.random() * pool.length);
            digits.push(pool[idx]);
            pool.splice(idx, 1);
        }
        return digits.join('');
    }

    private patternedRandom(digitCount: number): string {
        const a = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 10);
        if (b === a) b = (b + 1) % 10;
        let digits = [];
        for (let i = 0; i < digitCount; i++) {
            digits.push(i % 2 === 0 ? a : b);
        }
        if (digits[0] === 0) digits[0] = 1;
        return digits.join('');
    }

    private biasedRandom(digitCount: number, bias: 'low' | 'high'): string {
        let digits = [Math.floor(Math.random() * 9) + 1];
        for (let i = 1; i < digitCount; i++) {
            let d = bias === 'low'
                ? Math.floor(Math.pow(Math.random(), 2) * 10)
                : 9 - Math.floor(Math.pow(Math.random(), 2) * 10);
            digits.push(Math.max(0, Math.min(9, d)));
        }
        return digits.join('');
    }

    private palindromicRandom(digitCount: number): string {
        let half = Math.ceil(digitCount / 2);
        let digits = [Math.floor(Math.random() * 9) + 1];
        for (let i = 1; i < half; i++) {
            digits.push(Math.floor(Math.random() * 10));
        }
        let mirror = digits.slice(0, digitCount % 2 === 0 ? half : half - 1).reverse();
        return digits.concat(mirror).join('');
    }

    private isPrime(n: number): boolean {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    private primeRandom(digitCount: number): string {
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        let tries = 0;
        while (tries < 10000) {
            let n = Math.floor(Math.random() * (max - min + 1)) + min;
            if (this.isPrime(n)) return n.toString();
            tries++;
        }
        // fallback
        return this.defaultRandom(digitCount);
    }

    private randomWalk(digitCount: number): string {
        let digits = [Math.floor(Math.random() * 9) + 1];
        let current = digits[0];
        for (let i = 1; i < digitCount; i++) {
            let step = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            current = (current + step + 10) % 10;
            digits.push(current);
        }
        return digits.join('');
    }

    private sparseRandom(digitCount: number): string {
        let digits = Array(digitCount).fill(0);
        let nonZeroCount = Math.max(1, Math.floor(digitCount / 3));
    let positions: number[] = [];
        while (positions.length < nonZeroCount) {
            let pos = Math.floor(Math.random() * digitCount);
            if (!positions.includes(pos)) positions.push(pos);
        }
        for (let i = 0; i < positions.length; i++) {
            digits[positions[i]] = i === 0 ? Math.floor(Math.random() * 9) + 1 : Math.floor(Math.random() * 10);
        }
        return digits.join('');
    }
}
