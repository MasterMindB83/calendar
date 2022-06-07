import { MyCalendarModule } from './my-calendar/my-calendar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
