import { NumberPatternGenerator } from './number-pattern-generators-base';

export class RandomTimeGenerator extends NumberPatternGenerator {
    generate(): string {
        const hour = Math.floor(Math.random() * 24);
        const minute = Math.floor(Math.random() * 60);
        const hh = hour.toString().padStart(2, '0');
        const mm = minute.toString().padStart(2, '0');
        return `${hh}:${mm}`;
    }
}
