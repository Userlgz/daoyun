import { VarServiceService } from './../../shared/service/var-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {

  courseName = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private varServiceService: VarServiceService,
  ) {
      this.courseName = varServiceService.getCourseName();
    // console.log('constructor' + this.courseName);
    // this.activatedRoute.queryParams.subscribe(
    //   (queryParams: Params) => {
    //     console.log(queryParams);
    //     this.courseName = queryParams.courseName;
    //   }
    // );
  }

  ngOnInit() {
    // console.log('ngOnInit');
    // console.log(this.courseName);
  }

}
