import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ModalService } from 'app/components/modal/modal.service';
import { DatePipe } from '@angular/common';
import { StudentCalendar } from 'app/app.component';
import { IsLoggedService } from 'app/servises/is-logged.service';

@Component({ 
  selector: 'fullcal-cmp',
  moduleId: module.id,
  templateUrl: 'fullcall.component.html',
  styleUrls: ['fullcal.component.css']
})

export class FullCalComponent {
  calendar:StudentCalendar[]=[];
  calEvent:StudentCalendar ;
  /* = {
    code:0,
    course_name:'',
    sessionNum:0,
    location:'',
    type:'',
    sessionDate:null, 
    sessionEndDate:null, 
    teacher:'',
   }; */
  eventColor:any;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = []; //{ title: 'Event Now', start: new Date() }
  constructor(
    private modalService: ModalService,
    private datePipe: DatePipe,
    private IsLoggedService : IsLoggedService,
  ) {
    let color:string = '';
    /*
    this.IsLoggedService.studentCalendar.subscribe((calendar:StudentCalendar[] ) => {
      console.log('fullcal',calendar);
      this.calendar = calendar;
    }); */
    let s = sessionStorage.getItem('studen_calendar');
    this.calendar = JSON.parse(s);
    this.calEvent = this.calendar[0];
    for (let i=0; i<this.calendar.length; i++) {
      if (this.calendar[i].sessionDate !== null) {
        if (this.calendar[i].type ===      'Lesson')        color='#2196f3'
        else if (this.calendar[i].type === 'Training')      color='#009688'
        else if (this.calendar[i].type === 'Test')          color='#673ab7' 
        else if (this.calendar[i].type === 'Cancel Lesson') color='#ff5722' ;
        this.calendarEvents = this.calendarEvents.concat({ 
          title:            this.calendar[i].course_name,
          start:            this.calendar[i].sessionDate,
          textColor:        '#FFFFFF',
          borderColor:      color,
          backgroundColor:  color,
          course_name:      this.calendar[i].course_name,
          sessionNum:       this.calendar[i].sessionNum,
          location:       this.calendar[i].location,
          sessionDate:      this.datePipe.transform(new Date(this.calendar[i].sessionDate),   'HH-mm'),
          sessionEndDate:   this.datePipe.transform(new Date(this.calendar[i].sessionEndDate),'HH-mm'),
          teacher:          this.calendar[i].teacher,
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
    //console.log(info);  
    this.calEvent.course_name =     info.event.extendedProps.course_name;   
    this.calEvent.sessionNum =      info.event.extendedProps.sessionNum;
    this.calEvent.location =        info.event.extendedProps.location;
    this.calEvent.sessionDate =     info.event.extendedProps.sessionDate;
    this.calEvent.sessionEndDate =  info.event.extendedProps.sessionEndDate;
    this.calEvent.teacher =         info.event.extendedProps.teacher;
    this.calEvent.type =            info.event.extendedProps.type;
    this.eventColor = info.event.backgroundColor;
    let modalWidth = 150;
    let modalHeight = 200;
    let x:number = info.jsEvent.clientX-info.jsEvent.toElement.offsetWidth-15;
    let y:number = info.jsEvent.clientY-info.jsEvent.toElement.offsetHeight-15;
    if (y+modalHeight > document.body.offsetHeight) y = document.body.offsetHeight - modalHeight//y - modalHeight - 10;
    if (y<=0) y=10;
    //console.log('x' ,x+modalWidth ,'y' , y , 'with',document.body.offsetWidth , 'high' , document.body.offsetHeight)
    this.openModal('custom-modal-1', x , y , modalWidth);
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
}

