import { NumberPatternGenerator } from './number-pattern-generators-base';

export class PalindromeNumberGenerator extends NumberPatternGenerator {
  private n = 1;
  generate(digitCount: number): string {
    while (!PalindromeNumberGenerator.isPalindrome(this.n)) this.n++;
    return (this.n++).toString();
  }
  override reset(): void { this.n = 1; }
  static isPalindrome(n: number): boolean {
    const s = n.toString();
    return s === s.split('').reverse().join('');
  }
}
