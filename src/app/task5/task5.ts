import { ChangeDetectionStrategy, Component, ViewChild, ElementRef } from '@angular/core';
import { RedTheme, GreenTheme } from './theme';

@Component({
    selector: 'app-task5-component',
    template: `
    <div class="task-5-container" #container>
        <select class="task5-dropdown" (ngModelChange)="setTheme($event)" [ngModel]="colorOptions[0]">
            <option *ngFor="let option of colorOptions" [value]="option">{{option}}</option>
        </select>
    </div>
    `,
    styleUrls: ['./task5.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task5Component {


    @ViewChild('container', { static: true, read: ElementRef })
    container: ElementRef<HTMLDivElement>

    readonly colorOptions: string[] = ['red', 'green']

    setTheme(value) {
        let theme;
        switch (value) {
            case 'red': {
                theme = RedTheme;
                break;
            }
            case 'green': {
                theme = GreenTheme;
                break;
            }
            default: return;
        }
        Object.keys(theme).forEach(prop => {
            this.container.nativeElement.style.setProperty('--' + prop, theme[prop])
        })
    }
}
