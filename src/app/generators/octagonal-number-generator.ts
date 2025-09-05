import { NumberPatternGenerator } from './number-pattern-generators-base';

export class OctagonalNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    const oct = this.n * (3 * this.n - 2);
    this.n++;
    return oct.toString();
  }
  override reset(): void { this.n = 1; }
}
