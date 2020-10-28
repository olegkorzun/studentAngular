import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* material */
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';

/* fullcalendar */
import { FullCalendarModule } from '@fullcalendar/angular';
/* application elements */
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';
import { TableListComponent } from 'app/pages/table-list/table-list.component';
import { TeacherListComponent } from 'app/pages/teacher-list/teacher-list.component';
import { ModalModule } from 'app/components/modal/modal.module';
import { MessageComponent } from 'app/pages/message/message.component';
import { TicketComponent } from 'app/pages/ticket/ticket.component';
import { FullCalComponent }  from 'app/pages/fullcal/fullcal.component';
import { FullCalTeachComponent }  from 'app/pages/fullcalteach/fullcalteach.component';
import { LoginComponent }   from 'app/pages/login/login.component';
import { VideoSoftComponent }   from 'app/pages/videosoft/videosoft.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FullCalendarModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatCheckboxModule,
    MatBadgeModule,
  ],
  declarations: [
    FullCalComponent,
    FullCalTeachComponent,
    LoginComponent,
    UserProfileComponent,
    TableListComponent,
    TeacherListComponent,
    MessageComponent,
    TicketComponent,
    VideoSoftComponent,
  ]
})

export class AdminLayoutModule {}
