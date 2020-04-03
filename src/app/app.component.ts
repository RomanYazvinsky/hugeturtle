import { Component } from '@angular/core';
import { Task1 } from './task1/task1';
import { Task2 } from './task2/task2';
import { Task3 } from './task3/task3';
import { Task6 } from './task6/task6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private task6: Task6) {

  }
  startTask1() {
    new Task1().test();
  }
  startTask2() {
    new Task2().test();
  }
  startTask3() {
    new Task3().test();
  }
  startTask6() {
    this.task6.test()
  }
}
