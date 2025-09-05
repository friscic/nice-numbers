import { NumberPatternGenerator } from './number-pattern-generators-base';

// Alternating Digits Generator
export class AlternatingDigitsGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        const digits = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        while (digits[1] === digits[0]) digits[1] = Math.floor(Math.random() * 10);
        let integerStr = '', decimalStr = '';
        for (let i = 0; i < Math.floor(digitCount / 2); i++) {
            integerStr += digits[i % 2];
        }
        for (let i = 0; i < digitCount - Math.floor(digitCount / 2); i++) {
            decimalStr += digits[i % 2];
        }
        return `${integerStr}.${decimalStr}`;
    }
}

// Random Walk Generator
export class RandomWalkGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        let current = Math.floor(Math.random() * 10);
        let integerStr = current.toString(), decimalStr = '';
        for (let i = 1; i < Math.floor(digitCount / 2); i++) {
            current = (current + (Math.random() < 0.5 ? 1 : 9)) % 10;
            integerStr += current.toString();
        }
        current = Math.floor(Math.random() * 10);
        decimalStr = current.toString();
        for (let i = 1; i < digitCount - Math.floor(digitCount / 2); i++) {
            current = (current + (Math.random() < 0.5 ? 1 : 9)) % 10;
            decimalStr += current.toString();
        }
        return `${integerStr}.${decimalStr}`;
    }
}

// Digit Sum Constraint Generator
export class DigitSumConstraintGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        const targetSum = Math.floor(Math.random() * 9 * digitCount * 0.7) + digitCount; // random sum
        let sum = 0, integerStr = '', decimalStr = '';
        for (let i = 0; i < Math.floor(digitCount / 2); i++) {
            let digit = Math.min(9, targetSum - sum - (Math.floor(digitCount / 2) - i - 1));
            if (digit < 0) digit = 0;
            integerStr += digit;
            sum += digit;
        }
        for (let i = 0; i < digitCount - Math.floor(digitCount / 2); i++) {
            let digit = Math.min(9, targetSum - sum - (digitCount - Math.floor(digitCount / 2) - i - 1));
            if (digit < 0) digit = 0;
            decimalStr += digit;
            sum += digit;
        }
        return `${integerStr}.${decimalStr}`;
    }
}

// Multiplicative Pattern Generator
export class MultiplicativePatternGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        let factor = Math.floor(Math.random() * 9) + 1;
        let current = Math.floor(Math.random() * 9) + 1;
        let integerStr = current.toString(), decimalStr = '';
        for (let i = 1; i < Math.floor(digitCount / 2); i++) {
            current = (current * factor) % 10;
            integerStr += current.toString();
        }
        current = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < digitCount - Math.floor(digitCount / 2); i++) {
            current = (current * factor) % 10;
            decimalStr += current.toString();
        }
        return `${integerStr}.${decimalStr}`;
    }
}

// Block Pattern Generator
export class BlockPatternGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        const blockSize = Math.max(1, Math.floor(Math.random() * (Math.floor(digitCount / 2) - 1)) + 1);
        const blockDigit = Math.floor(Math.random() * 10).toString();
        let integerStr = '', decimalStr = '';
        for (let i = 0; i < Math.floor(digitCount / 2); i++) {
            integerStr += (Math.floor(i / blockSize) % 2 === 0) ? blockDigit : ((+blockDigit + 1) % 10).toString();
        }
        for (let i = 0; i < digitCount - Math.floor(digitCount / 2); i++) {
            decimalStr += (Math.floor(i / blockSize) % 2 === 0) ? blockDigit : ((+blockDigit + 1) % 10).toString();
        }
        return `${integerStr}.${decimalStr}`;
    }
}

// Sparse Pattern Generator
export class SparsePatternGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        let integerStr = '', decimalStr = '';
        for (let i = 0; i < Math.floor(digitCount / 2); i++) {
            integerStr += Math.random() < 0.7 ? '0' : Math.floor(Math.random() * 10).toString();
        }
        for (let i = 0; i < digitCount - Math.floor(digitCount / 2); i++) {
            decimalStr += Math.random() < 0.7 ? '0' : Math.floor(Math.random() * 10).toString();
        }
        return `${integerStr}.${decimalStr}`;
    }
}
