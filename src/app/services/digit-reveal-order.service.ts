// moved from card/digit-reveal-order.service.ts
import { Injectable } from '@angular/core';

export type RevealMode = 'ltr' | 'rtl' | 'random' | 'center-out';

@Injectable({ providedIn: 'root' })
export class DigitRevealOrderService {
    getRevealOrder(digits: string[], mode: RevealMode): number[] {
        const n = digits.length;
        if (mode === 'ltr') return [...Array(n).keys()];
        if (mode === 'rtl') return [...Array(n).keys()].reverse();
        if (mode === 'random') return [...Array(n).keys()].sort(() => Math.random() - 0.5);
        if (mode === 'center-out') {
            const order: number[] = [];
            const center = Math.floor((n - 1) / 2);
            for (let offset = 0; order.length < n; offset++) {
                if (center - offset >= 0) order.push(center - offset);
                if (center + offset + (n % 2 === 0 ? 1 : 0) < n) order.push(center + offset + (n % 2 === 0 ? 1 : 0));
            }
            return order.slice(0, n);
        }
        return [...Array(n).keys()];
    }
}

// For backward compatibility
export function getRevealOrder(digits: string[], mode: RevealMode): number[] {
    return new DigitRevealOrderService().getRevealOrder(digits, mode);
}
