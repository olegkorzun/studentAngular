
import { Component, OnInit } from '@angular/core';
//constants an interfaces
export const ImgPath: string    = "assets/img/usr/";
export const FilesPath: string  = "files/";
export const VideoSoftwareDownload: string  = "https://drive.google.com/drive/folders/1YcGAfukfvHC0OPWMZoMyRdHO1AigAlVF?usp=sharing";

export interface User {
  user: {
    address:            string,
    amount:             number,
    email:              string,
    familyName:         string,
    firstName:          string,
    idImage:            string,
    location:           number,
    mobileNumber:       string,
    password:           string,
    paymentMethodsCode: number,
    registeryDate:      Date,
    role:               number,
    secondMobileNumber: string,
    status:             number,
    studentID:          string,
    theme:              number
    username:           string
  }
}

/* Teacher Intefaces */

export interface TeacherCycles {
  code:             number,
  opendate:         Date,
  courseCode:       number,
  courseName:       string,
  hours:            number,
  students:         number,
}
export interface CycleStudents {
  studentID:        number,
  firstName:        string,
  familyName:       string,
  mobileNumber:     string,
  email:            string,
  location:         number,
  examMark:         number,
  projectMark:      number,
  courseCode:       number,
  courseName:       string,
}
export interface TeacherCalendar {
  cyclecode:      number,
  courseName:     string,
  session_num:    number,
  sessionDate:    Date,
  sessionEndDate: Date,
  sessionType:    number,
  teacherID:      number,
  type:           string,
  location:       string
  
}
export interface VisitsCycleSession {
  cyclecode:    number,
  session_num:  number,
  studentID:    string,
  firstName:    string,
  familyName:   string,
  mobileNumber: string,
  email:        string,
  location:     number,
  visit:        number,
}

export interface StudentVisit {
  cycle:          number,
  studentID:      string,
  session:        number,
  visit:          number, 
}

export interface CoursesPerStudent {
  code:           number,
  student:        string,
  course:         number,
  examMark:       number,
  passed:         number,
  timesRepeated:  number,
  showingUp:      number,
  projectMark:    number,
  freezCourse:    number,
  freezeDate:     Date,
  enable_replay:  number,
}
 
/* Messaging Intefaces */
/*  tickets */
export const ReqType = ['permit','practice','grade','viewrecord','freeze','other'];
export const AnsType = ['waiting','allowed','denied'];
export interface Ticket {
  ticket_id:      number,
  student_id:     string,
  req_type:       string, //'permit','practice','grade','viewrecord','freeze','other'
  req_reason:     string,
  req_date:       Date,
  admin_id:       string,
  ans_type:       string, //'waiting','allowed','denied'
  ans_reason:     string,
  ans_date:       Date,
  act_date:       Date,
  course_id:      number,
  path_id:        number,
  cycle_id:       number,
}
export interface ChatMessage {
  _id:            number,
  mess:           string,
  ticket:         number,
  student:        string,
  date:           Date, 
  cat:            string, 
  name:           string,
  id:             string,
  sock:           string,
}


/* Student Intefaces */
export interface StudentCalendar {
 code:number,
 course_name:string,
 sessionNum:number,
 location:string,
 type:string,
 sessionDate:Date, 
 sessionEndDate:Date, 
 teacher:string,
}
export interface Student {
  studentID:string, 
  firstName:string, 
  familyName:string, 
  address:string, 
  email:string, 
  mobileNumber:string, 
  registeryDate:Date, 
}
export interface Attendance {
code:           number,
course_name:    string,
location:       string,
sessionDate:    Date,
sessionEndDate: Date,
sessionNum: number,
teacher: string,
type: string,
visit: number,
url_video: string,
}
export interface Course {
  courseName:string,
  examMark:number,
  projectMark:number,
  date:Date,        
  update_date:Date, 
  status:string,
  teach_name:string,
  cycle:number,
  course:number,
  sess:number,
  vis:number,
  url: string, 
}
// component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit() {
    sessionStorage.clear();
  }
}
