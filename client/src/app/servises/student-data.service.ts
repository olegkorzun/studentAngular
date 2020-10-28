import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Course, StudentCalendar, User, Student } from 'app/app.component';

@Injectable({providedIn: 'root'})
export class StudentDataService {
  studentInfo:Student;
  
  constructor(
    private ServerApiService: ServerApiService, 
  ) { }
  getStudentInfo(){return this.studentInfo};

  provideStudentData(data:User,callback) {
    let student_id:string = data.user.studentID;
    let student = {
      studentID:    data.user.studentID, 
      firstName:    data.user.firstName, 
      familyName:   data.user.familyName, 
      address:      data.user.address, 
      email:        data.user.email, 
      mobileNumber: data.user.mobileNumber, 
      registeryDate:data.user.registeryDate, 
    }
    this.studentInfo = student;
    this.ServerApiService.fetchCoursesSessions(student_id)
    .subscribe((data:Course[])=>{
      let s  = JSON.stringify(data);
      sessionStorage.setItem('student_courses',s);
      this.ServerApiService.fetchCalendar(student_id)
      .subscribe((data:StudentCalendar[])=>{
        s = JSON.stringify(data);
        sessionStorage.setItem('studen_calendar',s);
        callback(true);
      },(error) => {
        callback(false);
      });
    },(error) => {
      callback(false);
    });
  }
}
