import { Component, OnInit } from '@angular/core';
import { StudentData } from '../app.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  stud: StudentData = {
    studentID:'',
    address:'',
    email:'',
    familyName:'',
    firstName:'',
    mobileNumber:'',
    registeryDate:''
  }
  
  studentData: StudentData[] = []

  constructor() { }

  ngOnInit() {
    let st:string = sessionStorage.getItem('student')
    this.studentData = JSON.parse(st)
    this.stud = this.studentData[0]
  }

}
