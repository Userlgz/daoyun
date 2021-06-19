import { VarServiceService } from './../../../shared/service/var-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.page.html',
  styleUrls: ['./course-info.page.scss'],
})
export class CourseInfoPage implements OnInit {

  courseName = '';
  course: any;
  constructor(
    private varServiceService: VarServiceService,
  ) {
    // this.courseName = varServiceService.getCourseName();
    this.course = VarServiceService.course;
    console.log('cs course');
    console.log(this.course);
    this.courseName = this.course.name;

  }

  ngOnInit() {
    // this.createCode();
    this.course = VarServiceService.course;
    console.log('cs course');
    console.log(this.course);
    this.courseName = this.course.name;
  }
  delCourse() {

  }
}
