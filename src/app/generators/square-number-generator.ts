import { NumberPatternGenerator } from './number-pattern-generators-base';

export class SquareNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    this.n++;
    return (this.n * this.n).toString();
  }
  override reset(): void { this.n = 1; }
}
