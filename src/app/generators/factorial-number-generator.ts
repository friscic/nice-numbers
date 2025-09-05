import { NumberPatternGenerator } from "./number-pattern-generators-base";

export class FactorialNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  private factorial = 1;
  generate(digitCount: number): string {
    this.factorial *= this.n;
    this.n++;
    return this.factorial.toString();
  }
  override reset(): void { this.n = 1; this.factorial = 1; }
}
