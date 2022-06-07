import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    MyCalendarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports:[MyCalendarComponent]
})
export class MyCalendarModule { }
