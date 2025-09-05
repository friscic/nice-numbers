import { Injectable, EventEmitter } from '@angular/core';
import { RevealMode, getRevealOrder } from './digit-reveal-order.service';

@Injectable({ providedIn: 'root' })
export class DigitAnimationService {
    /**
     * Animates the reveal of digits in the given order and emits when complete.
     * Returns a Promise that resolves when the animation is done.
     */
    async animateDigits(
        digits: string[],
        showDigits: boolean[],
        setShowDigits: (arr: boolean[]) => void,
        setBlink: (val: boolean) => void,
        animationComplete: EventEmitter<void>,
        setRevealMode: (mode: RevealMode) => void
    ): Promise<void> {
        const modes: RevealMode[] = ['ltr', 'rtl', 'random', 'center-out'];
        const revealMode = modes[Math.floor(Math.random() * modes.length)];
        setRevealMode(revealMode);
        const order = getRevealOrder(digits, revealMode);
        let revealed = [...showDigits];
        for (let idx = 0; idx < order.length; idx++) {
            const i = order[idx];
            await new Promise((resolve) => setTimeout(resolve, idx === 0 ? 0 : 1200));
            revealed[i] = true;
            setShowDigits([...revealed]);
        }
        // Delay before blink
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setBlink(true);
        setTimeout(() => {
            setBlink(false);
            animationComplete.emit();
        }, 400);
    }
}
