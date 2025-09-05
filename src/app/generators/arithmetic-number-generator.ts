import { NumberPatternGenerator } from './number-pattern-generators-base';

export class ArithmeticNumberGenerator extends NumberPatternGenerator {
  private last = 1;
  private step = 1;
  generate(digitCount: number): string {
    this.last += this.step;
    return this.last.toString();
  }
  override reset(): void {
    this.last = 1;
    this.step = 1;
  }
  setStep(step: number) { this.step = step; }
}
