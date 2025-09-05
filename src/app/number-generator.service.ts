import { Injectable } from '@angular/core';
import {
  NumberPatternGenerator,
  RandomDecimalGenerator,
  RandomIntegerGenerator,
  ArithmeticNumberGenerator,
  GeometricNumberGenerator,
  FibonacciNumberGenerator,
  PrimeNumberGenerator,
  SquareNumberGenerator,
  CubeNumberGenerator,
  TriangularNumberGenerator,
  FactorialNumberGenerator,
  PowerOfTwoNumberGenerator,
  CatalanNumberGenerator,
  HexagonalNumberGenerator,
  PentagonalNumberGenerator,
  OctagonalNumberGenerator,
  LucasNumberGenerator,
  PellNumberGenerator,
  HappyNumberGenerator,
  HarshadNumberGenerator,
  PalindromeNumberGenerator,
  CenteredHexagonalNumberGenerator,
  RandomTimeGenerator
} from './generators';
export type NumberPattern =
  | 'randomDecimal'
  | 'randomInteger'
  | 'randomTime'
  | 'arithmetic'
  | 'geometric'
  | 'fibonacci'
  | 'prime'
  | 'square'
  | 'cube'
  | 'triangular'
  | 'factorial'
  | 'powerOfTwo'
  | 'catalan'
  | 'hexagonal'
  | 'pentagonal'
  | 'octagonal'
  | 'lucas'
  | 'pell'
  | 'happy'
  | 'harshad'
  | 'palindrome'
  | 'centeredHexagonal';

export const NUMBER_PATTERN_NAMES: Record<NumberPattern, string> = {
//   random: '🎲',
  randomDecimal: '⏬',
  randomInteger: '🔢',
  randomTime: '⏰',
  arithmetic: '➕',
  geometric: '📈',
  fibonacci: '🌱',
  prime: '🔢',
  square: '⬛',
  cube: '🧊',
  triangular: '🔺',
  factorial: '❗',
  powerOfTwo: '2️⃣',
  catalan: '🌿',
  hexagonal: '⬡',
  pentagonal: '⬟',
  octagonal: '🛑',
  lucas: '🦁',
  pell: '📝',
  happy: '😊',
  harshad: '💡',
  palindrome: '🔄',
  centeredHexagonal: '🔷',
};

export const NUMBER_PATTERN_LABELS: Record<NumberPattern, string> = {
//   random: 'Random Numbers',
  randomDecimal: 'Random Decimal',
  randomInteger: 'Random Integer',
  randomTime: 'Random Time',
  arithmetic: 'Arithmetic Sequence',
  geometric: 'Geometric Sequence',
  fibonacci: 'Fibonacci Numbers',
  prime: 'Prime Numbers',
  square: 'Square Numbers',
  cube: 'Cube Numbers',
  triangular: 'Triangular Numbers',
  factorial: 'Factorial Numbers',
  powerOfTwo: 'Powers of Two',
  catalan: 'Catalan Numbers',
  hexagonal: 'Hexagonal Numbers',
  pentagonal: 'Pentagonal Numbers',
  octagonal: 'Octagonal Numbers',
  lucas: 'Lucas Numbers',
  pell: 'Pell Numbers',
  happy: 'Happy Numbers',
  harshad: 'Harshad Numbers',
  palindrome: 'Palindrome Numbers',
  centeredHexagonal: 'Centered Hexagonal Numbers',
};

@Injectable({ providedIn: 'root' })
export class NumberGeneratorService {
  mode: NumberPattern = 'randomDecimal';
  private generators: Record<NumberPattern, NumberPatternGenerator> = {
    randomDecimal: new RandomDecimalGenerator(),
    randomInteger: new RandomIntegerGenerator(),
    randomTime: new RandomTimeGenerator(),
    arithmetic: new ArithmeticNumberGenerator(),
    geometric: new GeometricNumberGenerator(),
    fibonacci: new FibonacciNumberGenerator(),
    prime: new PrimeNumberGenerator(),
    square: new SquareNumberGenerator(),
    cube: new CubeNumberGenerator(),
    triangular: new TriangularNumberGenerator(),
    factorial: new FactorialNumberGenerator(),
    powerOfTwo: new PowerOfTwoNumberGenerator(),
    catalan: new CatalanNumberGenerator(),
    hexagonal: new HexagonalNumberGenerator(),
    pentagonal: new PentagonalNumberGenerator(),
    octagonal: new OctagonalNumberGenerator(),
    lucas: new LucasNumberGenerator(),
    pell: new PellNumberGenerator(),
    happy: new HappyNumberGenerator(),
    harshad: new HarshadNumberGenerator(),
    palindrome: new PalindromeNumberGenerator(),
    centeredHexagonal: new CenteredHexagonalNumberGenerator(),
  };

  setMode(mode: NumberPattern) {
    this.mode = mode;
    const generator = this.generators[mode];
    if (generator.reset) generator.reset();
  }

  generate(): number | string {
    const digitCount = Math.floor(Math.random() * 6) + 1; // max 6 digits
    return this.generators[this.mode].generate(digitCount);
  }

  setArithmeticStep(step: number) {
  const gen = this.generators['arithmetic'] as unknown as ArithmeticNumberGenerator;
  gen.setStep(step);
  }
  setGeometricRatio(ratio: number) {
  const gen = this.generators['geometric'] as unknown as GeometricNumberGenerator;
  gen.setRatio(ratio);
  }

  static isPrimeStatic(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  static isHappyStatic(n: number): boolean {
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

  static isHarshadStatic(n: number): boolean {
    const sum = n
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
    return n % sum === 0;
  }

  static isPalindromeStatic(n: number): boolean {
    const s = n.toString();
    return s === s.split('').reverse().join('');
  }

  getPatternName(): string {
    return NUMBER_PATTERN_LABELS[this.mode];
  }

  getPatternIcon(pattern?: NumberPattern): string {
    return NUMBER_PATTERN_NAMES[pattern ?? this.mode];
  }
}
