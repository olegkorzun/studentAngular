import { Component, OnInit } from '@angular/core';
import { CoursesData } from '../app.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursesData: CoursesData[] = []

  constructor() { }

  ngOnInit() {
    let st:string = sessionStorage.getItem('courses')
    this.coursesData = JSON.parse(st)
  }

}