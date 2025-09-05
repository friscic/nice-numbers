export abstract class NumberPatternGenerator {
    abstract generate(digitCount?: number): string;
    reset?(): void;
}
