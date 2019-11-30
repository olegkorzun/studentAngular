import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './servises/auth.service';

export interface StudentData {
  address: string
  email: string
  familyName: string
  firstName: string
  mobileNumber: string
  registeryDate: string
  studentID: string
}

export interface CoursesData {
  code: number
  courseName: string
  examMark: number
  projectMark: number
  student: string
}

export interface CalendarData {
  code: number
  locationId: number
  sessionDate: string
  sessionEndDate: string
  sessionNum: number
  sessionType: number
  teacher: string
}

export interface Post {
  title: string
  text: string
  date?: Date
  id?: number
}

export interface Day {
  day: string
  thisMonthDay: boolean
  today?: boolean
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rtstudent';
  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    sessionStorage.clear()
  }

  startLogin() {
    this.router.navigate(['/login'])
  }
  startLogout() {
    this.AuthService.logout()
    this.router.navigate(['/'])
  }
}
