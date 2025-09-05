import { NumberPatternGenerator } from "./number-pattern-generators-base";

export class HappyNumberGenerator extends NumberPatternGenerator {
  private last = 1;
  generate(digitCount: number): string {
    let happy = this.last;
    while (!HappyNumberGenerator.isHappy(happy)) happy++;
    this.last = happy + 1;
    return happy.toString();
  }
  override reset(): void { this.last = 1; }
  static isHappy(n: number): boolean {
    let seen = new Set<number>();
    while (n !== 1 && !seen.has(n)) {
      seen.add(n);
      n = n
        .toString()
        .split('')
        .map(Number)
        .reduce((sum, d) => sum + d * d, 0);
    }
    return n === 1;
  }
}
