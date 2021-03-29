import { VarServiceService } from './../../../shared/service/var-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.page.html',
  styleUrls: ['./course-info.page.scss'],
})
export class CourseInfoPage implements OnInit {

  courseName = '13213';
  constructor() {
    this.courseName = VarServiceService.courseName;
  }

  ngOnInit() {
  }

}
