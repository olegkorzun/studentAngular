import { Component, OnInit } from '@angular/core';
import { Student } from 'app/app.component';
import { DatePipe } from '@angular/common';
import { StudentDataService } from 'app/servises/student-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  student:Student;
  registeryDate ='';

  constructor(
    private datePipe: DatePipe,
    private StudentDataService: StudentDataService
  ) { 
    this.student = this.StudentDataService.getStudentInfo();
    this.registeryDate = this.datePipe.transform(new Date(this.student.registeryDate), 'yyyy-MM-dd');
  }
  ngOnInit() {}
  onSubmit() {}
}
