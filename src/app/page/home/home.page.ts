import { VarServiceService } from './../../shared/service/var-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // courses = {
  //   teacherId: '',
  //   name: '',
  //   term: '',
  //   testTime: '',
  //   courseNumber: ''
  // };
  courses = [
    {
      id: 1,
      teacherName: 'chi',
      name: '工程实践',
      term: '2020-2021-2',
      testTime: '',
      courseNumber: '123456',
    },
    {
      id: 2,
      teacherName: 'chi',
      name: '工程训练',
      term: '2020-2021-1',
      testTime: '',
      courseNumber: '123147',
    },
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSegChange(event) {
    // event => {
    console.log(event.detail.value);
    // }
  }
  toCourse(name) {
    // console.log('toCourse ' + name);
    VarServiceService.courseName = name;
    // console.log(VarServiceService.courseName);
    // this.router.navigate(['course'], { queryParams: { courseName: name } });
    this.router.navigateByUrl('course');
  }
}
