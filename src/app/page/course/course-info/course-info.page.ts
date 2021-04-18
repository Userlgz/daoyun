import { VarServiceService } from './../../../shared/service/var-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.page.html',
  styleUrls: ['./course-info.page.scss'],
})
export class CourseInfoPage implements OnInit {

  courseName = '';
  constructor(
    private varServiceService: VarServiceService,
  ) {
    this.courseName = varServiceService.getCourseName();
  }

  ngOnInit() {
  }

}
