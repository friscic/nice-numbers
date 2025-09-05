import { Injectable, ElementRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FontSizeService {
    /**
     * Calculates and applies the optimal font size for the given element and digit count.
     * Returns the font size as a string (e.g., '32px').
     */
    updateFontSize(cardNumberRef: ElementRef<HTMLDivElement>, digitCount: number): string {
        if (!cardNumberRef) { 
            return '2em';
        }
        const el = cardNumberRef.nativeElement;
        el.style.fontSize = '';
        const parent = el.parentElement;
        if (!parent) { 
            return '2em'; 
        }
        const containerWidth = parent.offsetWidth;
        const containerHeight = parent.offsetHeight;
        // Use 90% of available width and height
        let fontSizeW, fontSizeH, fontSizePx;
        if (digitCount === 1) {
            fontSizeW = Math.floor(containerWidth * 0.90);
            fontSizeH = Math.floor(containerHeight * 0.90);
            fontSizePx = Math.max(fontSizeW, fontSizeH);
        } else {
            fontSizeW = Math.floor(containerWidth / (digitCount * 0.65));
            fontSizeH = Math.floor(containerHeight * 0.92);
            fontSizePx = Math.min(fontSizeW, fontSizeH);
        }
        fontSizePx = Math.max(32, fontSizePx);
        const fontSize = fontSizePx + 'px';
        el.style.fontSize = fontSize;

        return fontSize;
    }
}
