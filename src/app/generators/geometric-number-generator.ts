import { NumberPatternGenerator } from './number-pattern-generators-base';

export class GeometricNumberGenerator extends NumberPatternGenerator {
  private last = 1;
  private ratio = 2;
  generate(digitCount: number): string {
    this.last *= this.ratio;
    return this.last.toString();
  }
  override reset(): void {
    this.last = 1;
    this.ratio = 2;
  }
  setRatio(ratio: number) { this.ratio = ratio; }
}
