import { NumberPatternGenerator } from "./number-pattern-generators-base";

export class TriangularNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    const t = (this.n * (this.n + 1)) / 2;
    this.n++;
    return t.toString();
  }
  override reset(): void { this.n = 1; }
}
