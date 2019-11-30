import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../servises/student-api.service';
import { StudentData, CoursesData, CalendarData } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from '../servises/auth.service'

@Component({
  selector: 'app-student-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [StudentApiService]
})
export class LoginComponent implements OnInit {

  user = ''
  password = ''

  constructor(
    private StudentApiService: StudentApiService,
    private AuthService: AuthService,    
    private router: Router
    ) { }

  ngOnInit() {}

  getLogin() {
    if (!this.user.trim() && !this.password.trim()) {
      return
    }
    // request student data
    this.StudentApiService.fetchStudent('https://rt-students.com/api/getStudent/'+this.user+'&'+this.password)
    .subscribe(
      (studentData: StudentData[])=>{
        if (studentData[0].studentID) {
          let st:string = JSON.stringify(studentData)
          sessionStorage.setItem('student',st)
          // request courses data
          this.StudentApiService.fetchStudent('https://rt-students.com/api/getCourses/'+studentData[0].studentID)
          .subscribe(
            (coursesData: CoursesData[])=>{ 
              st = JSON.stringify(coursesData)
              sessionStorage.setItem('courses',st)
              // request calendar data
              this.StudentApiService.fetchStudent('https://rt-students.com/api/getCalendar/'+studentData[0].studentID)
              .subscribe(
                (calendarData: CalendarData[])=>{
                  st = JSON.stringify(calendarData)
                  sessionStorage.setItem('calendar',st)
                  this.AuthService.login()
                  this.router.navigate(['/student'])
                },
                (error) => {
                  console.log(error)
                });    
            },
            (error) => {
              console.log(error)
            });      
        }
      },
      (error) => {
        console.log(error)
      });
  } 

}
