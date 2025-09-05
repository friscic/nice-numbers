import { Component } from '@angular/core';
import {
    NumberGeneratorService,
    NUMBER_PATTERN_NAMES,
    NumberPattern,
} from '../number-generator.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Card } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-deck',
    standalone: true,
    imports: [CommonModule, FormsModule, Card],
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.css'],
    animations: [
        trigger('fadeCard', [
            transition(':enter', [style({ opacity: 0 }), animate('2000ms ease', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 0 })]),
        ]),
    ],
})
export class Deck {
    theme: string = 'light';
    cards: string[] = [];
    showLikedDisliked = false;
    autoGenerate: boolean = false;
    autoGenerateInterval: number = 2000;
    private autoGenerateActive: boolean = false;
    private dragStartX: number | null = null;
    private dragActive: boolean = false;
    likedNumbers: string[] = [];
    dislikedNumbers: string[] = [];
    seenNumbers: string[] = [];
    showSeenNumbers = false;
    showPatterns = true;
    patternKeys = Object.keys(NUMBER_PATTERN_NAMES) as NumberPattern[];
    patternNames = NUMBER_PATTERN_NAMES;
    selectedPatterns: NumberPattern[];
    current = 0;
    showCard = true;
    private _resolveAnimation: (() => void) | null = null;

    constructor(public numberGenerator: NumberGeneratorService) {
        const saved = localStorage.getItem('selectedPatterns');
        if (saved) {
            const parsed = JSON.parse(saved) as NumberPattern[];
            this.selectedPatterns = parsed.length ? parsed : [this.numberGenerator.mode];
        } else {
            this.selectedPatterns = [this.numberGenerator.mode];
        }
        const showPatternsSaved = localStorage.getItem('showPatterns');
        this.showPatterns = showPatternsSaved ? JSON.parse(showPatternsSaved) : true;
        this.restoreSeenNumbers();
        this.cards = [this.generateUniqueNumber()];
        this.restorePopularity();
    }

    ngOnInit() {
        this.setupAutoGenerate();
    }

    ngOnDestroy() {
        this.clearAutoGenerateTimer();
    }

    onThemeChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        this.theme = value;
        if (value === 'dark') {
            document.body.style.background = '#222';
            document.body.style.color = '#eee';
        } else {
            document.body.style.background = '#fff';
            document.body.style.color = '#222';
        }
    }

    onDragStart(event: MouseEvent) {
        this.dragStartX = event.clientX;
        this.dragActive = true;
    }

    onDragMove(event: MouseEvent) {
        if (!this.dragActive || this.dragStartX === null) return;
    }

    onDragEnd(event: MouseEvent) {
        if (!this.dragActive || this.dragStartX === null) return;
        const dragDistance = event.clientX - this.dragStartX;
        if (dragDistance > 60) {
            this.nextCard();
        } else if (dragDistance < -60) {
            this.prevCard();
        }
        this.dragStartX = null;
        this.dragActive = false;
    }

    switchDislikedToLiked(num: string) {
        this.dislikedNumbers = this.dislikedNumbers.filter(n => n !== num);
        if (!this.likedNumbers.includes(num)) {
            this.likedNumbers.push(num);
        }
        localStorage.setItem('likedNumbers', JSON.stringify(this.likedNumbers));
        localStorage.setItem('dislikedNumbers', JSON.stringify(this.dislikedNumbers));
        this.setPopularity(num, 1);
    }

    switchLikedToDisliked(num: string) {
        this.likedNumbers = this.likedNumbers.filter(n => n !== num);
        if (!this.dislikedNumbers.includes(num)) {
            this.dislikedNumbers.push(num);
        }
        localStorage.setItem('likedNumbers', JSON.stringify(this.likedNumbers));
        localStorage.setItem('dislikedNumbers', JSON.stringify(this.dislikedNumbers));
        this.setPopularity(num, -1);
    }

    deleteLikedNumber(num: string) {
        this.likedNumbers = this.likedNumbers.filter(n => n !== num);
        localStorage.setItem('likedNumbers', JSON.stringify(this.likedNumbers));
        this.setPopularity(num, 0);
    }

    deleteDislikedNumber(num: string) {
        this.dislikedNumbers = this.dislikedNumbers.filter(n => n !== num);
        localStorage.setItem('dislikedNumbers', JSON.stringify(this.dislikedNumbers));
        this.setPopularity(num, 0);
    }

    toggleShowPatterns() {
        this.showPatterns = !this.showPatterns;
        localStorage.setItem('showPatterns', JSON.stringify(this.showPatterns));
    }

    onSelectAllChange(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        if (checked) {
            this.selectedPatterns = [...this.patternKeys];
        } else {
            this.selectedPatterns = [this.numberGenerator.mode];
        }
        localStorage.setItem('selectedPatterns', JSON.stringify(this.selectedPatterns));
        this.numberGenerator.setMode(this.selectedPatterns[0]);
        this.cards = [this.generateWithSelectedPatterns().toString()];
        this.current = 0;
    }

    onPatternCheckboxChange(pattern: NumberPattern, event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        if (checked) {
            if (!this.selectedPatterns.includes(pattern)) {
                this.selectedPatterns.push(pattern);
            }
        } else {
            this.selectedPatterns = this.selectedPatterns.filter((p) => p !== pattern);
        }
        if (this.selectedPatterns.length === 0) {
            this.selectedPatterns = [this.numberGenerator.mode];
        }
        localStorage.setItem('selectedPatterns', JSON.stringify(this.selectedPatterns));
        this.numberGenerator.setMode(this.selectedPatterns[0]);
        this.cards = [this.generateWithSelectedPatterns().toString()];
        this.current = 0;
    }

    onPatternsChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        const selected: NumberPattern[] = Array.from(select.selectedOptions).map(
            (opt) => opt.value as NumberPattern
        );
        this.selectedPatterns = selected.length ? selected : [this.numberGenerator.mode];
        this.numberGenerator.setMode(this.selectedPatterns[0]);
        this.cards = [this.generateWithSelectedPatterns().toString()];
        this.current = 0;
    }

    nextCard() {
        if (this.current === this.cards.length - 1) {
            this.cards.push(this.generateUniqueNumber());
        }
        this.showCard = false;
        setTimeout(() => {
            this.current++;
            this.showCard = true;
        }, 100);
        if (this.current >= this.cards.length - 1 && this.autoGenerate) {
            this.clearAutoGenerateTimer();
            this.autoGenerate = false;
        }
    }

    prevCard() {
        if (this.current > 0) {
            this.showCard = false;
            setTimeout(() => {
                this.current--;
                this.showCard = true;
            }, 0);
        }
    }

    likeCard() {
        const val = this.cards[this.current];
        this.dislikedNumbers = this.dislikedNumbers.filter(n => n !== val);
        if (!this.likedNumbers.includes(val)) {
            this.likedNumbers.push(val);
        }
        this.setPopularity(val, 1);
        this.persistPopularity();
    }

    dislikeCard() {
        const val = this.cards[this.current];
        this.likedNumbers = this.likedNumbers.filter(n => n !== val);
        if (!this.dislikedNumbers.includes(val)) {
            this.dislikedNumbers.push(val);
        }
        this.setPopularity(val, -1);
        this.persistPopularity();
    }

    getLikedNumbers(): string[] {
        return this.likedNumbers;
    }

    getDislikedNumbers(): string[] {
        return this.dislikedNumbers;
    }

    generateWithSelectedPatterns(): string {
        const pattern = this.selectedPatterns[Math.floor(Math.random() * this.selectedPatterns.length)];
        this.numberGenerator.setMode(pattern);
        return this.numberGenerator.generate().toString();
    }

    private restoreSeenNumbers() {
        const seen = localStorage.getItem('seenNumbers');
        this.seenNumbers = seen ? JSON.parse(seen) : [];
    }

    private persistSeenNumbers() {
        localStorage.setItem('seenNumbers', JSON.stringify(this.seenNumbers));
    }

    private generateUniqueNumber(): string {
        let tries = 0;
        let num: string;
        do {
            num = this.generateWithSelectedPatterns();
            tries++;
        } while (this.seenNumbers.includes(num) && tries < 100);
        this.seenNumbers.push(num);
        this.persistSeenNumbers();
        return num;
    }

    private restorePopularity() {
        const liked = localStorage.getItem('likedNumbers');
        const disliked = localStorage.getItem('dislikedNumbers');
        this.likedNumbers = liked ? JSON.parse(liked) : [];
        this.dislikedNumbers = disliked ? JSON.parse(disliked) : [];
    }

    private persistPopularity() {
        localStorage.setItem('likedNumbers', JSON.stringify(this.likedNumbers));
        localStorage.setItem('dislikedNumbers', JSON.stringify(this.dislikedNumbers));
    }

    private getPopularity(key: string): number {
        const pop = localStorage.getItem('popularity_' + key);
        return pop ? parseInt(pop, 10) : 0;
    }

    private setPopularity(key: string, value: number) {
        localStorage.setItem('popularity_' + key, value.toString());
    }

    setupAutoGenerate() {
        this.autoGenerateActive = false;
        if (this.autoGenerate) {
            this.autoGenerateActive = true;
            if (this.showCard) {
                this.autoGenerateNext();
            }
        }
    }

    clearAutoGenerateTimer() {
        this.autoGenerateActive = false;
    }

    async autoGenerateNext() {
        while (this.autoGenerateActive) {
            await new Promise<void>(resolve => this._resolveAnimation = () => resolve());
            if (!this.autoGenerateActive) break;
            await new Promise(resolve => setTimeout(resolve, this.autoGenerateInterval));
            this.nextCard();
        }
    }

    onCardAnimationComplete() {
        if (this._resolveAnimation) {
            this._resolveAnimation();
            this._resolveAnimation = null;
        }
    }

    onAutoGenerateChange() {
        this.setupAutoGenerate();
    }
}
