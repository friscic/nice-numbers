import { NumberPatternGenerator } from './number-pattern-generators-base';

export class HexagonalNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    const hex = this.n * (2 * this.n - 1);
    this.n++;
    return hex.toString();
  }
  override reset(): void { this.n = 1; }
}
