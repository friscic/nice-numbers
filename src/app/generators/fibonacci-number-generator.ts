import { NumberPatternGenerator } from './number-pattern-generators-base';

export class FibonacciNumberGenerator extends NumberPatternGenerator {
  private a = 0;
  private b = 1;
  generate(digitCount: number): string {
    const next = this.a + this.b;
    this.a = this.b;
    this.b = next;
    return next.toString();
  }
  override reset(): void { this.a = 0; this.b = 1; }
}
