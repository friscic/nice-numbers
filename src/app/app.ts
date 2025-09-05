import { Component, signal } from '@angular/core';
import { Deck } from './deck/deck.component';

@Component({
    selector: 'app-root',
    imports: [Deck],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class App {
    protected readonly title = signal('nice-numbers-app');
}
