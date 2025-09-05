import { NumberPatternGenerator } from './number-pattern-generators-base';

export class LucasNumberGenerator extends NumberPatternGenerator {
    private a = 2;
    private b = 1;
    generate(digitCount: number): string {
        // Find the first Lucas number with at least digitCount digits
        let a = 2;
        let b = 1;
        let next = a;
        if (digitCount <= 1) {
            return a.toString();
        }
        while (next.toString().length < digitCount) {
            next = a + b;
            a = b;
            b = next;
        }
        // Reset sequence for next call
        this.a = 2;
        this.b = 1;
        return next.toString();
    }
    
    override reset(): void { this.a = 2; this.b = 1; }
}
