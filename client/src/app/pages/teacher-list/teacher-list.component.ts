import { Component, OnInit } from '@angular/core';
import { ServerApiService } from 'app/servises/server-api.service';
import { ModalService } from 'app/components/modal/modal.service';
import { TeacherCycles, CycleStudents, CoursesPerStudent } from 'app/app.component';
import { TeacherDataService } from 'app/servises/teacher-data.service';
import * as _ from "underscore";
declare var $: any;
@Component({ 
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
  providers: [
    ServerApiService,
  ]
})
export class          TeacherListComponent implements OnInit {
  teacherCycles:      TeacherCycles[]=[];
  cycleStudents:      CycleStudents[]=[];
  coursesPerStudent:  CoursesPerStudent[]=[];
  isCycleStudents:    boolean = false;
  student_id = '';
  constructor(
    private ServerApiService:   ServerApiService,
    private modalService:       ModalService,
    private TeacherDataService: TeacherDataService
  ) { 
    this.teacherCycles = this.TeacherDataService.getTeacherCycles();
  }
  getCycleStudents(cycle) {
    console.log(cycle)
    this.ServerApiService.fetchCycleStudents(cycle)
    .subscribe((data:CycleStudents[])=>{
      this.cycleStudents = data;
      let modalWidth = Math.floor(document.body.offsetWidth*0.8);
      let x:number = Math.floor(document.body.offsetWidth*0.1);
      let y:number = Math.floor(document.body.offsetHeight*0.1);
      this.openModal('custom-modal-4', x , y , modalWidth);
    },(error) => {
      console.log(error);
    });
  }
  // modal window
  openModal(id: string, x:number,y:number,l:number) {
    this.isCycleStudents = true;
    this.modalService.open(id,x,y,l);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    this.isCycleStudents = false;
  }
  ngOnInit() {}

  saveMarks(c,f) {
    this.coursesPerStudent = [];
    for (const key of Object.keys(f.value)) {
      let coursePerStudent:CoursesPerStudent = _.findWhere(this.coursesPerStudent,{student: key.substring(1)});
      if (coursePerStudent === undefined) {
        coursePerStudent = {
          student:    key.substring(1),
          course:     c,
          examMark:   0,
          projectMark:0,
          code:0,
          passed:0,
          timesRepeated:0,
          showingUp:0,
          freezCourse:0,
          freezeDate: null,
          enable_replay: 0,
        }
        if (key[0]=='e') {
          coursePerStudent.examMark = f.value[key];
        } else if (key[0]=='p') {
          coursePerStudent.projectMark = f.value[key];
        }
        this.coursesPerStudent.push(coursePerStudent);
      } else {
        if (key[0]=='e') {
          coursePerStudent.examMark = f.value[key];
        } else if (key[0]=='p') {
          coursePerStudent.projectMark = f.value[key];
        }
      }
    }
    //console.log(this.coursesPerStudent);
    let courseperstudent = {
      courseperstudent:this.coursesPerStudent
    }
    let str = JSON.stringify(courseperstudent);
    this.ServerApiService.postCoursesPerStudent(str) 
    .subscribe((data)=>{
      this.showNotification('bottom','left',2,"Marks Saved");
      this.closeModal('custom-modal-4');
    },(error) => {
      console.log(error);
    });
    
  
  }
  showNotification(from, align, t:number, mess:string){
    const type = ['','info','success','warning','danger'];
    $.notify({
        icon: "notifications",
        message: mess
    },{
        type: type[t],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
