import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Task4Component } from './task4/task4';
import { Task5Component } from './task5/task5';
import { reducer } from './task6/reducer';
import { Task6 } from './task6/task6';

@NgModule({
  declarations: [
    AppComponent,
    Task4Component,
    Task5Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ task6: reducer })
  ],
  providers: [Task6],
  bootstrap: [AppComponent]
})
export class AppModule { }
