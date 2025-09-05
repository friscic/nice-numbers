import { NumberPatternGenerator } from './number-pattern-generators-base';

export class LucasNumberGenerator extends NumberPatternGenerator {
  private a = 2;
  private b = 1;
  generate(digitCount: number): string {
    const next = this.a + this.b;
    this.a = this.b;
    this.b = next;
    return next.toString();
  }
  override reset(): void { this.a = 2; this.b = 1; }
}
