import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


import { getRevealOrder, RevealMode } from '../services/digit-reveal-order.service';
import { FontSizeService } from '../services/font-size.service';
import { DigitAnimationService } from '../services/digit-animation.service';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class Card implements OnChanges, AfterViewInit, AfterViewChecked {
    revealMode: RevealMode = 'ltr'; // 'ltr' (default), 'rtl', 'random', or 'center-out'
    @ViewChild('cardNumber', { static: true }) cardNumberRef!: ElementRef<HTMLDivElement>;
    fontSize: string = '2em';
    private fontSizeCalculated = false;
    @Input() number: string = '';
    digits: string[] = [];
    showDigits: boolean[] = [];
    blink: boolean = false;
    @Output() animationComplete = new EventEmitter<void>();

    constructor(
        private cdr: ChangeDetectorRef,
        private fontSizeService: FontSizeService,
        private digitAnimationService: DigitAnimationService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['number']) {
            // Split into integer and decimal parts
            const str = String(this.number);
            const dotIdx = str.indexOf('.');
            if (dotIdx === -1) {
                // No decimal, treat as integer
                this.digits = str.split('');
            } else {
                const intPart = str.substring(0, dotIdx);
                const decPart = str.substring(dotIdx + 1);
                // Reverse only the decimal part
                this.digits = [
                    ...intPart.split(''),
                    '.',
                    ...decPart.split('').reverse()
                ];
            }
            this.showDigits = Array(this.digits.length).fill(false);
            this.fontSizeCalculated = false;
            this.animateDigits();
        }
    }

    private resizeTimeout: any;
    private resizeListener = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            window.requestAnimationFrame(() => this.updateFontSize());
        }, 100);
    };

    ngAfterViewInit() {
        this.updateFontSize();
        window.addEventListener('resize', this.resizeListener);
        window.addEventListener('orientationchange', this.resizeListener);
    }

    ngAfterViewChecked() {
        if (!this.fontSizeCalculated) {
            this.updateFontSize();
            this.fontSizeCalculated = true;
            this.cdr.detectChanges();
        }
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.resizeListener);
        window.removeEventListener('orientationchange', this.resizeListener);
    }

    updateFontSize() {
        if (!this.cardNumberRef) return;
        this.fontSize = this.fontSizeService.updateFontSize(this.cardNumberRef, this.digits.length || 1);
    }

    async animateDigits() {
        await this.digitAnimationService.animateDigits(
            this.digits,
            this.showDigits,
            (arr: boolean[]) => { this.showDigits = arr; },
            (val: boolean) => { this.blink = val; },
            this.animationComplete,
            (mode: RevealMode) => { this.revealMode = mode; }
        );
    }
}
