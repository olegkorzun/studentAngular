import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';

import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';
import { TableListComponent } from 'app/pages/table-list/table-list.component';
import { TeacherListComponent } from 'app/pages/teacher-list/teacher-list.component';
import { MessageComponent } from 'app/pages/message/message.component';
import { TicketComponent } from 'app/pages/ticket/ticket.component';
import { FullCalTeachComponent } from 'app/pages/fullcalteach/fullcalteach.component';
import { FullCalComponent } from 'app/pages/fullcal/fullcal.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { VideoSoftComponent }   from 'app/pages/videosoft/videosoft.component';

export const AdminLayoutRoutes: Routes = [
    { 
        path: 'login',          
        component: LoginComponent 
    },
    { 
        path: 'fullcal',        
        component: FullCalComponent , 
        canActivate: [AuthGuard]
    },
    { 
        path: 'fullcalteach',        
        component: FullCalTeachComponent , 
        canActivate: [AuthGuard]
    },
    { 
        path: 'ticket',        
        component: TicketComponent , 
        canActivate: [AuthGuard]
    },
    { 
        path: 'message',        
        component: MessageComponent , 
        canActivate: [AuthGuard]
    },
    { 
        path: 'user-profile',   
        component: UserProfileComponent, 
        canActivate: [AuthGuard] 
    },
    { 
        path: 'table-list',     
        component: TableListComponent, 
        canActivate: [AuthGuard] 
    },
    { 
        path: 'teacher-list',     
        component: TeacherListComponent, 
        canActivate: [AuthGuard] 
    },
    { 
        path: 'videosoft',     
        component: VideoSoftComponent, 
        canActivate: [AuthGuard] 
    },
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
];
