import { NumberPatternGenerator } from './number-pattern-generators-base';

export class PowerOfTwoNumberGenerator extends NumberPatternGenerator {
  private value = 1;
  generate(digitCount: number): string {
    this.value *= 2;
    return this.value.toString();
  }
  override reset(): void { this.value = 1; }
}
