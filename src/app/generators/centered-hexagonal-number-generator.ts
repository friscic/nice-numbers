import { NumberPatternGenerator } from './number-pattern-generators-base';

export class CenteredHexagonalNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    const centeredHex = 3 * this.n * (this.n - 1) + 1;
    this.n++;
    return centeredHex.toString();
  }
  override reset(): void { this.n = 1; }
}
