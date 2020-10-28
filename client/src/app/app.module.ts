import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; // Important
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrModule } from "ngx-toastr";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { ServerApiService } from './servises/server-api.service';
import { StudentDataService } from './servises/student-data.service';
import { ChatService } from './servises/chat.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [    
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ServerApiService,
    ChatService,
    DatePipe,
    StudentDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
