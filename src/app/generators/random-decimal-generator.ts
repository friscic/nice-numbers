
import { NumberPatternGenerator } from './number-pattern-generators-base';

type PatternResult = { integerStr: string, decimalStr: string };

enum PatternType {
    Repeated,
    Mirrored,
    SequentialAscending,
    SequentialDescending
}

export class RandomDecimalGenerator extends NumberPatternGenerator {
    generate(digitCount: number): string {
        const intDigits = Math.floor(digitCount / 2);
        const decDigits = digitCount - intDigits;
        const patternType = Math.floor(Math.random() * 4) as PatternType;
        let result: PatternResult;
        switch (patternType) {
            case PatternType.Repeated:
                result = this.repeatedPattern(intDigits, decDigits);
                break;
            case PatternType.Mirrored:
                result = this.mirroredPattern(intDigits, decDigits);
                break;
            case PatternType.SequentialAscending:
                result = this.sequentialAscendingPattern(intDigits, decDigits);
                break;
            case PatternType.SequentialDescending:
                result = this.sequentialDescendingPattern(intDigits, decDigits);
                break;
            default:
                throw new Error('Unknown pattern type');
        }
        return `${result.integerStr}.${result.decimalStr}`;
    }

    /**
     * Generates a repeated or partially repeated pattern.
     */
    private repeatedPattern(intDigits: number, decDigits: number): PatternResult {
        const digit = Math.floor(Math.random() * 10).toString();
        let integerStr = '';
        let decimalStr = '';
        if (Math.random() < 0.5) {
            integerStr = digit.repeat(intDigits);
            decimalStr = digit.repeat(decDigits);
        } else {
            const repeatInt = intDigits > 2 ? Math.floor(Math.random() * (intDigits - 1)) + 2 : intDigits;
            const repeatDec = decDigits > 2 ? Math.floor(Math.random() * (decDigits - 1)) + 2 : decDigits;
            integerStr = digit.repeat(repeatInt);
            for (let i = repeatInt; i < intDigits; i++) {
                integerStr += Math.floor(Math.random() * 10).toString();
            }
            decimalStr = digit.repeat(repeatDec);
            for (let i = repeatDec; i < decDigits; i++) {
                decimalStr += Math.floor(Math.random() * 10).toString();
            }
        }
        return { integerStr, decimalStr };
    }

    /**
     * Generates a mirrored pattern (decimal part is reverse of integer part).
     */
    private mirroredPattern(intDigits: number, decDigits: number): PatternResult {
        let integerStr = '';
        for (let i = 0; i < intDigits; i++) {
            integerStr += Math.floor(Math.random() * 10).toString();
        }
        const decimalStr = integerStr.split('').reverse().join('').slice(0, decDigits);
        return { integerStr, decimalStr };
    }

    /**
     * Generates a sequential ascending pattern.
     */
    private sequentialAscendingPattern(intDigits: number, decDigits: number): PatternResult {
        let integerStr = '';
        let decimalStr = '';
        const startInt = Math.floor(Math.random() * (10 - intDigits));
        for (let i = 0; i < intDigits; i++) {
            integerStr += ((startInt + i) % 10).toString();
        }
        const startDec = Math.floor(Math.random() * (10 - decDigits));
        for (let i = 0; i < decDigits; i++) {
            decimalStr += ((startDec + i) % 10).toString();
        }
        return { integerStr, decimalStr };
    }

    /**
     * Generates a sequential descending pattern.
     */
    private sequentialDescendingPattern(intDigits: number, decDigits: number): PatternResult {
        let integerStr = '';
        let decimalStr = '';
        const startInt = Math.floor(Math.random() * (10 - intDigits)) + intDigits - 1;
        for (let i = 0; i < intDigits; i++) {
            integerStr += ((startInt - i + 10) % 10).toString();
        }
        const startDec = Math.floor(Math.random() * (10 - decDigits)) + decDigits - 1;
        for (let i = 0; i < decDigits; i++) {
            decimalStr += ((startDec - i + 10) % 10).toString();
        }
        return { integerStr, decimalStr };
    }
}
