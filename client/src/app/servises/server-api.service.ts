import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServerApiService {
  
  constructor(private http: HttpClient) { }

  /* Login */  
  fetchLogin(username:string, password:string) {
    let data = JSON.stringify({username:username,password:password});
    return this.http.post('https://rt-students.com/login_web/' + '?username='+username+'&password='+password, data,
    {headers: new HttpHeaders({'Content-Type':  'application/x-www-form-urlencoded'})}); 
  }

  fetchLoginNew(username:string, password:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    let user = {
      username:username,
      password:password,
    }
    let data = JSON.stringify(user);
    return this.http.post('https://rt-students.xyz:8000/login', data , httpOptions ); 
  }

  /* Teacher */  
  /* requests */
  postStudentVisits(visits:string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('https://rt-students.xyz:8000/student_visits' , visits , httpOptions ); 
  } 

  postCoursesPerStudent(courseperstudent:string) {
    console.log(courseperstudent);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post('https://rt-students.xyz:8000/courseperstudent' , courseperstudent , httpOptions ); 
  } 


  fetchTeacherCalendar(teacherID:string) {
    return this.http.get(
      'https://rt-students.com/api/teacher_calendar/'+teacherID
      //,{ withCredentials: true }
    );
  }

  fetchVisitsCycleSession(cycle:number,sess:number) {
    return this.http.get(
      'https://rt-students.com/api/visits_cycle_session/'+cycle+'&'+sess
    );
  }
  fetchTeacherCycles(teacherID:string) {
    return this.http.get(
      'https://rt-students.com/api/teacher_cycles/'+teacherID
    );
  }
  fetchCycleStudents(cycle:number) {
    return this.http.get(
      'https://rt-students.com/api/cycle_students/'+cycle
    );
  }


  /* Students */
  /* requests */
  fetchStudent(userName:string, password:string) {
    return this.http.get('https://rt-students.com/api/getstudent/'+userName+'&'+password); 
  }

  fetchCourses(userCode:string) {
    return this.http.get('https://rt-students.com/api/getcourses2/'+userCode); 
  }

  fetchCoursesSessions(userCode:string) {
    return this.http.get('https://rt-students.com/api/getcourses3/'+userCode); 
  }

  fetchCalendar(userCode:string) {
    return this.http.get('https://rt-students.com/api/getcalendar2/'+userCode); 
  }

  fetchAttendanceData(id:string, cy:number) {
    return this.http.get('https://rt-students.com/api/attendance/'+id+'&'+cy); 
  }

  fetchCourseData(courseCode:number, cycleCode:number) {
    return this.http.get('https://rt-students.com/api/coursesdata2/'+courseCode+'&'+cycleCode); 
  }

}
