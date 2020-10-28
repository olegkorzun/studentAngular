import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servises/auth.service';
import { IsLoggedService } from '../../servises/is-logged.service';


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
//  { path: '/notifications', title: 'notifications',  icon: 'dashboard', class: 'Teacher' },
    { path: '/', title: 'Login',  icon: 'dashboard', class: 'Login' },
    { path: '/user-profile', title: 'Student Profile',  icon:'person', class: 'Student' },
    { path: '/table-list', title: 'Courses List',  icon:'list_alt', class: 'Student' },
    { path: '/teacher-list', title: 'Courses List',  icon:'list_alt', class: 'Teacher' },
    { path: '/fullcal', title: 'Calendar',  icon:'event', class: 'Student' },
    { path: '/fullcalteach', title: 'Calendar',  icon:'event', class: 'Teacher' },
    { path: '/videosoft', title: 'Video Soft',  icon:'bubble_chart', class: 'Student' },
//  { path: '/message', title: 'Messaging',  icon:'notifications', class: 'Teacher' },
//  { path: '/ticket', title: 'Tickets',  icon:'notifications', class: 'Teacher' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  first_name: string = '';
  last_name: string = '';

  userProfile:string = "Login";
  menuItems: any[];

  constructor(
    private router: Router,
    private IsLoggedService: IsLoggedService,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
    this.IsLoggedService.isUserLoggedIn.subscribe((userLoggedIn: boolean) => {
      if (userLoggedIn) {
        this.isUserLoggedIn = userLoggedIn;
        this.first_name = sessionStorage.getItem("first_name");
        this.last_name = sessionStorage.getItem("last_name");
      }
    });
    this.IsLoggedService.userProfile.subscribe((userProfile: string) => {
      this.userProfile = userProfile;
  });

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  startLogout() {
    this.IsLoggedService.setUserLoggedIn(false);
    this.isUserLoggedIn = false;
    sessionStorage.clear();
    this.AuthService.logout();
    this.router.navigate(['/']);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
