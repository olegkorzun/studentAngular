import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalService } from 'app/components/modal/modal.service';
import { DatePipe } from '@angular/common';
import { TeacherCalendar, VisitsCycleSession, StudentVisit } from 'app/app.component';
import { TeacherDataService } from 'app/servises/teacher-data.service';
import { ServerApiService } from 'app/servises/server-api.service';
import { NgForm } from '@angular/forms';
declare var $: any; 
@Component({ 
  selector: 'fullcal-cmp',
  moduleId: module.id,
  templateUrl: 'fullcalteach.component.html',
  styleUrls: ['fullcalteach.component.css'],
  providers: [
    ServerApiService
  ]
})

export class FullCalTeachComponent {
  calendar:TeacherCalendar[]=[];
  calEvent:TeacherCalendar;
  visits:VisitsCycleSession[] = [];
  studentVisits:StudentVisit[] = [];
  eventColor:any;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = []; //{ title: 'Event Now', start: new Date() }
  constructor(
    private modalService:       ModalService,
    private datePipe:           DatePipe,
    private TeacherDataService: TeacherDataService,
    private ServerApiService:   ServerApiService,

  ) {
    let color:string = '';
    this.calendar = this.TeacherDataService.getTeacherCalendar();
    this.calEvent = this.calendar[0];
    for (let i=0; i<this.calendar.length; i++) {
      if (this.calendar[i].sessionDate !== null) {
        if (this.calendar[i].type ===      'Lesson')        color='#2196f3'
        else if (this.calendar[i].type === 'Training')      color='#009688'
        else if (this.calendar[i].type === 'Test')          color='#673ab7' 
        else if (this.calendar[i].type === 'Cancel Lesson') color='#ff5722' ;
        this.calendarEvents = this.calendarEvents.concat({ 
          title:            this.calendar[i].courseName,
          start:            this.calendar[i].sessionDate,
          textColor:        '#FFFFFF',
          borderColor:      color,
          backgroundColor:  color,
          courseName:       this.calendar[i].courseName,
          session_num:      this.calendar[i].session_num,
          location:         this.calendar[i].location,
          cyclecode:        this.calendar[i].cyclecode,
          sessionDate:      this.datePipe.transform(new Date(this.calendar[i].sessionDate),'dd/MM/yyyy HH-mm'),
          type:             this.calendar[i].type,
        });
      }
    }
  }
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }
  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }
  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }
  // modal window
  openModal(id: string, x:number,y:number,l:number) {
    this.modalService.open(id,x,y,l);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  eventClick (info) {
    // prepare data 
    this.calEvent.courseName =      info.event.extendedProps.courseName;
    this.calEvent.cyclecode =       info.event.extendedProps.cyclecode;
    this.calEvent.session_num =     info.event.extendedProps.session_num;
    this.calEvent.location =        info.event.extendedProps.location;
    this.calEvent.sessionDate =     info.event.extendedProps.sessionDate;
    this.calEvent.sessionEndDate =  info.event.extendedProps.sessionEndDate;
    this.calEvent.type =            info.event.extendedProps.type;
    this.ServerApiService.fetchVisitsCycleSession(
      info.event.extendedProps.cyclecode,
      info.event.extendedProps.session_num
    ) 
    .subscribe((data:VisitsCycleSession[])=>{
      this.visits = data;
      this.eventColor = info.event.backgroundColor;
      let modalWidth = Math.floor(document.body.offsetWidth*0.6);
      let x:number = Math.floor(document.body.offsetWidth*0.2);
      let y:number = Math.floor(document.body.offsetHeight*0.15);
      this.openModal('custom-modal-2', x , y , modalWidth);
    },(error) => {
      console.log(error);
    });
  }
  saveVisits(cyclecode:number, session_num:number , sessionDate:any ,f: NgForm) {
    /*
    let q1 = new Date();
    let m1 = q1.getMonth()+1;
    let d1 = q1.getDay();
    let y1 = q1.getFullYear();
    let q2 = new Date(''+sessionDate);
    let m2 = q2.getMonth()+1;
    let d2 = q2.getDay();
    let y2 = q2.getFullYear();
    console.log(sessionDate,"NN",q2,'>>',m1,m2,'=',d1,d2,'+',y1,y2)
    if ((m1>=m2) && (d1>=d2) && (y1>=y2)) {
      */
      this.studentVisits = [];
      for (const key of Object.keys(f.value)) {
        let visit:number = 0;
        if (f.value[key]) visit= 1;
        let att = {
          cycle:      cyclecode,
          studentID:  key,
          session:    session_num,
          visit:      visit, 
        }
        this.studentVisits.push(att);
      }
      let attendance = {
        attendance:this.studentVisits
      }
      let str = JSON.stringify(attendance);
      this.ServerApiService.postStudentVisits(str) 
      .subscribe((data)=>{
        this.showNotification('bottom','left',2,"Attendance Saved");
        this.closeModal('custom-modal-2');
      },(error) => {
        console.log(error);
      });
//    } else this.showNotification('bottom','left',3,"You can not set Attendance");
  }
  mouseEnter(info) {
    info.jsEvent.toElement.style.cursor = 'pointer';
  }
  mouseLeave(info) {
    info.jsEvent.toElement.style.cursor = '';
  }
  handleDateClick(arg) {
    //this.closeModal('custom-modal-1');
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

