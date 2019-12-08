import { Component, OnInit, HostListener } from '@angular/core';
import * as moment from 'moment';
import { Day, CalendarData } from '../app.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
mobile:boolean;
calendarObj:CalendarData[] = []
datetime:moment.Moment = moment()
wk: Day[][] = [
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
  [{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false},{day:'',thisMonthDay:false,today:false}],
]
calMonth = ''

render() {
  let datetime = this.datetime.clone(),
  month = datetime.month();
  datetime.startOf('month').startOf('week');
  this.calMonth = this.datetime.format('MMMM YYYY')
  let week = 0, i;
  while (week < 6) {
    for (i = 0; i < 7; i++) {
      this.wk[week][i].day = '' + datetime.format('D')
      //checking if day of the current month
      if (month !== datetime.month()) {
        this.wk[week][i].thisMonthDay = false
      } else {
        this.wk[week][i].thisMonthDay = true
      }
      //checking today
      let curDate = moment();
      if (datetime.format('MM DD') == curDate.format('MM DD')) {
        this.wk[week][i].today = true
      }
      //checking in Student data possible course
      for (let k=0; k<this.calendarObj.length; k++) {
        if (this.calendarObj[k].sessionDate.slice(0, 10) == datetime.format('YYYY-MM-DD')) {
          this.wk[week][i].day  += ' ' + this.calendarObj[k].code + ' ' + this.calendarObj[k].teacher;
          break;
        }
      }
      datetime.add(1, 'day');
    }
    //end week
    week++;
  }
}

prevMonth () {
  this.datetime.startOf('month').subtract(1, 'day');
  this.render();
}
nextMonth () {
  this.datetime.endOf('month').add(1, 'day');
  this.render();
}
currMonth () {
  this.datetime = moment();
  this.render();
}

constructor() {}


mediaCheck() {
  // @media
  if (document.body.offsetWidth < 670) { 
    //document.body.offsetWidth
    this.mobile = true;
  } else {
    this.mobile = false;
  }
}

@HostListener("window:resize", [])
onResize() {
  this.mediaCheck();
}


ngOnInit() {
  this.mediaCheck();
  // calendar
  let st:string = sessionStorage.getItem('calendar')
  this.calendarObj = JSON.parse(st)

    this.calendarObj.sort(function (a, b) {
      if (a.sessionDate > b.sessionDate) {
          return 1;
      }
      if (a.sessionDate < b.sessionDate) {
          return -1;
      }
      return 0;
      });
    this.render()
  }
}