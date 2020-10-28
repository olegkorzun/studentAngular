import { Component, OnInit } from '@angular/core';
import { ServerApiService } from 'app/servises/server-api.service';
import { ModalService } from 'app/components/modal/modal.service';
import { Course, Attendance } from 'app/app.component';
import { StudentDataService } from 'app/servises/student-data.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [
    ServerApiService,
  ]
})
export class TableListComponent implements OnInit {
  courses:Course[]=[];
  cour:Course;
  attendance: Attendance[]=[];
  isAttendance:boolean = false;
  student_id = '';
  course_url = '';
  constructor(
    private ServerApiService: ServerApiService,
    private modalService: ModalService,
    private StudentDataService: StudentDataService
  ) { 
    let st:string = sessionStorage.getItem('student_courses');
    this.courses = JSON.parse(st);
    this.student_id  = this.StudentDataService.getStudentInfo().studentID;
  }
  getAtendanceData(course:Course) {
    
    this.ServerApiService.fetchAttendanceData(this.student_id,course.cycle)
    .subscribe((data:Attendance[])=>{
      this.attendance = data;
      this.cour = course;
      console.log(data)
      let modalWidth = Math.floor(document.body.offsetWidth*0.6);
      let x:number = Math.floor(document.body.offsetWidth*0.2);
      let y:number = Math.floor(document.body.offsetHeight*0.15);
      this.openModal('custom-modal-2', x , y , modalWidth);
    },(error) => {
      console.log(error);
    });
  }
  // modal window
  openModal(id: string, x:number,y:number,l:number) {
    this.isAttendance = true;
    this.modalService.open(id,x,y,l);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    this.isAttendance = false;
  }
  ngOnInit() {
  }

}
