import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables'; // npm i @types/datatables.net -dev

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppStyleDirective } from './directives/app-style.directive';
import { CalStyleDirective } from './directives/cal-style.directive';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HomeComponent,
    CoursesComponent,
    CalendarComponent,
    LoginComponent,
    ErrorPageComponent,
    AppStyleDirective,
    CalStyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
