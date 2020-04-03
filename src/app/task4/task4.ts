import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-task4-component',
    template: `
    <div class="task-4-container">
        <input class="task-4-input" type="text" [ngModel]="''" (ngModelChange)="updateList($event)">
        <div *ngFor="let message of (messages$ | async) ">
            {{message}}
        </div>
    </div>
    `,
    styles: [
        `.task-4-container {
            min-width: 400px;
            display: flex;
            flex-direction: column;
        }`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task4Component {
    private static readonly DATASOURCE = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

    messages$ = of(Task4Component.DATASOURCE);

    searchMessages(keyword: string): Observable<Message[]> {
        return of(Task4Component.DATASOURCE).pipe(map(messages => messages.filter(message => !keyword || message.includes(keyword))));
    }

    updateList(keyword: string) {
        this.messages$ = this.searchMessages(keyword);
    }
}

type Message = string;
