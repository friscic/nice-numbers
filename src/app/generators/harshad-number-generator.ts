import { NumberPatternGenerator } from './number-pattern-generators-base';

export class HarshadNumberGenerator extends NumberPatternGenerator {
  private last = 1;
  generate(digitCount: number): string {
    let harshad = this.last;
    while (!HarshadNumberGenerator.isHarshad(harshad)) harshad++;
    this.last = harshad + 1;
    return harshad.toString();
  }
  override reset(): void { this.last = 1; }
  static isHarshad(n: number): boolean {
    const sum = n
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
    return n % sum === 0;
  }
}
