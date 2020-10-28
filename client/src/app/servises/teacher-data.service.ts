import {Injectable} from '@angular/core'
import { ServerApiService } from './server-api.service';
import { User, TeacherCalendar, TeacherCycles } from 'app/app.component';

@Injectable({providedIn: 'root'})
export class TeacherDataService {
  private teacherID:string = '';
  private teacherCycles:TeacherCycles[] = [];
  private teacherCalendar: TeacherCalendar[] = [];
  constructor(
    private ServerApiService: ServerApiService, 
  ) { }
  setTeacherID(teacherID:string) {
    this.teacherID = teacherID;
  }
  getTeacherID() {
    return this.teacherID;
  }
  getTeacherCycles() {
    return this.teacherCycles;
  }
  getTeacherCalendar() {
    return this.teacherCalendar;
  }
  provideTeacherData(data:User,callback) {
    let teacher_id:string = data.user.studentID;
    this.ServerApiService.fetchTeacherCycles(teacher_id)
    .subscribe((data:TeacherCycles[])=>{
      this.teacherCycles = data;
      this.ServerApiService.fetchTeacherCalendar(teacher_id)
      .subscribe((data:TeacherCalendar[])=>{
        this.teacherCalendar = data;
        callback(true);
      },(error) => {
        callback(false);
      });
    },(error) => {
      callback(false);
    });
  }
}
