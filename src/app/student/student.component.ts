import { Component, OnInit } from '@angular/core';
import { StudentData, CoursesData, CalendarData } from '../app.component';
import Chart from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  // Data from RT 
  studentData: StudentData[] = [];
  coursesData: CoursesData[] = [];
  calendarData:CalendarData[] = [];

  // Near lesson
  datetime:moment.Moment = moment();
  nearDay:string;
  nearTeacher:string;
  nearCode: number;

  //progress bar data
  procentStudy:number = 0;
  procentGrade:number = 0;
  //chart data
  chartData1:number[] = []; 
  chartData2:number[] = []; 
  chartLabels:string[] = []; 
  prep1:string = '';
  prep2:string = '';
  

  prepareData() {
    // nearest session

    for (let k=0; k<this.calendarData.length; k++) {
      let dayCal=this.calendarData[k].sessionDate.slice(0, 10);
      if (dayCal == this.datetime.format('YYYY-MM-DD')) {
        this.nearDay = dayCal;
        this.nearCode = this.calendarData[k].code;
        this.nearTeacher = this.calendarData[k].teacher;
        break;
      }
    }
    // progress bars data
    // Study in progress
    let prValue = 0;
    for (let i = 0; i < this.coursesData.length; i++) {
      if (this.coursesData[i].examMark != 0 || this.coursesData[i].projectMark != 0) {
        prValue++;
      }
    }
    this.procentStudy = Math.trunc((prValue / this.coursesData.length) * 100);
    //Average grade for exams
    let mark:number = 0;
    let markConnt:number = 0;
    for (let i = 0; i < this.coursesData.length; i++) {
      if (this.coursesData[i].examMark != 0 ) {
        mark += this.coursesData[i].examMark;
        markConnt ++ ;
      }
      if (this.coursesData[i].projectMark != 0) {
        mark += this.coursesData[i].projectMark;
        markConnt ++ ;
      }
    }
    if (markConnt != 0) {
      this.procentGrade = Math.trunc( mark / markConnt);
    } else {
      this.procentGrade = 0;
    }

    //prepare chart data
    let month:string = this.calendarData[0].sessionDate.slice(0, 7);
    let chart1:number = 0;
    let chart2:number = 0;
    this.prep1 = 'סתיו';
    this.prep2 = 'Shmuel';
    let i=0;
    while (true) {
      if (i<this.calendarData.length) {
        let locmon:string = this.calendarData[i].sessionDate.slice(0, 7)
        if ( month.localeCompare(locmon) === 0 ) {
          if ( this.calendarData[i].teacher.localeCompare('סתיו') === 0 ) {
            chart1++;
          } else {
            chart2++;
          }
        } else {
          this.chartLabels.push(month);
          month = locmon;
          this.chartData1.push(chart1);        
          this.chartData2.push(chart2);
          chart1 = 0;
          chart2 = 0;
        }
        i++;
      } else {
        this.chartLabels.push(month);
        this.chartData1.push(chart1);        
        this.chartData2.push(chart2);
        break;
      }
    }
  

  }

  ngOnInit() {
    let st:string = sessionStorage.getItem('student');
    this.studentData = JSON.parse(st);
    st = sessionStorage.getItem('calendar');
    this.calendarData = JSON.parse(st);
    st = sessionStorage.getItem('courses')
    this.coursesData = JSON.parse(st);
    this.calendarData.sort(function (a, b) {
      if (a.sessionDate > b.sessionDate) {
          return 1;
      }
      if (a.sessionDate < b.sessionDate) {
          return -1;
      }
      return 0;
      });

    this.prepareData();
  
    // Chart
    let speedCanvas = document.getElementById("speedChart");

    let dataFirst = {
      data: this.chartData1,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };
    let dataSecond = {
      data: this.chartData2,
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };
    let speedData = {
      labels: this.chartLabels,
      datasets: [dataFirst, dataSecond]
    };
    let chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };
    let lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  
  }

}
