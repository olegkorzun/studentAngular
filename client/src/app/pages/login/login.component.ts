import { Component, OnInit } from '@angular/core';
import { ServerApiService } from 'app/servises/server-api.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/servises/auth.service';
import { IsLoggedService } from 'app/servises/is-logged.service';
import { StudentDataService } from 'app/servises/student-data.service';
import { TeacherDataService } from 'app/servises/teacher-data.service';
import { User } from 'app/app.component'; 

@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [
    ServerApiService
  ]
})

export class LoginComponent implements OnInit {
  user = ''
  password = ''
  loginError = false;
  loginErrorText = '';
  constructor(
    private ServerApiService: ServerApiService,
    private StudentDataService: StudentDataService,
    private TeacherDataService: TeacherDataService,
    private IsLoggedService: IsLoggedService,
    private AuthService: AuthService,    
    private router: Router,
  ) { }
  ngOnInit() {
    this.IsLoggedService.setUserProfile("Login");
  }

  getLogin() {
    this.loginError = false;
    if (!this.user.trim() && !this.password.trim()) {
      return;
    }
    this.ServerApiService.fetchLoginNew(this.user,this.password)
    .subscribe((data:User)=>{ 
      this.IsLoggedService.setUserLoggedIn(true);
      this.AuthService.login();
      this.IsLoggedService.setUserData(data);
      if (data.user.role === 1) {
        this.IsLoggedService.setUserProfile("Student");
        this.StudentDataService.provideStudentData(data, (result)=>{
          if (result) {
            this.router.navigate(['/fullcal']);
          }
        });
      }else if (data.user.role === 2) {
        this.TeacherDataService.setTeacherID(data.user.studentID);
        this.IsLoggedService.setUserProfile("Teacher");
        this.TeacherDataService.provideTeacherData(data, (result)=>{
          if (result) {
            this.router.navigate(['/fullcalteach']);
          }
        });
      }
    },(error) => {
      this.IsLoggedService.setUserLoggedIn(false);
      this.IsLoggedService.setUserProfile("Login");
      this.AuthService.logout();
      console.log('ERROR:',error);
      this.loginErrorText = 'Login error '+ error.error.text;
      this.loginError = true;
      this.user = '';
      this.password = '';
    });
  }
}
