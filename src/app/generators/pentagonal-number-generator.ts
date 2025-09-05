import { NumberPatternGenerator } from './number-pattern-generators-base';

export class PentagonalNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    const pent = (this.n * (3 * this.n - 1)) / 2;
    this.n++;
    return pent.toString();
  }
  override reset(): void { this.n = 1; }
}
