import { NumberPatternGenerator } from './number-pattern-generators-base';

export class CatalanNumberGenerator extends NumberPatternGenerator {
  private n = 0;
  private catalan: number[] = [1];
  generate(digitCount: number): string {
    const nextCat = (2 * (2 * this.n + 1) * this.catalan[this.n]) / (this.n + 2);
    this.catalan.push(nextCat);
    this.n++;
    return Math.round(nextCat).toString();
  }
  override reset(): void { this.n = 0; this.catalan = [1]; }
}
