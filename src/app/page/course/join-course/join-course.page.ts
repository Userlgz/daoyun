import { async } from '@angular/core/testing';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.page.html',
  styleUrls: ['./join-course.page.scss'],
})
export class JoinCoursePage implements OnInit {
  courseNumber: number;
  course = {
    teacherId: null,
    name: null,
    term: null,
    testArrange: null,
    courseNumber: null,
    school: null,
    college: null,
    classNumber: null,
    teachArrange: null,
    join: true,
    finish: false
  };

  constructor(
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.courseNumber = queryParams.courseNumber;
        console.log(this.courseNumber);
        this.getCourse();
      }
    );
  }

  ngOnInit() {

  }

  getCourse() {
    this.networkService.getCoursesByCourseNumber(this.courseNumber, this.varServiceService.getUser().token).then(async (result: any) => {
      console.log(result);
      if (result.code === 200) {
        this.course = result.data;

      }
      else {
        this.varServiceService.presentAlert(result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }

  onSubmission() {
    this.networkService.joinCourse(this.varServiceService.getUser().id,
      this.courseNumber, this.varServiceService.getUser().token).then(async (result: any) => {
        console.log(result);
        if (result.code === 200) {
          // this.course = result.data;
          this.varServiceService.presentToast('加入课程成功');
          this.router.navigateByUrl('tabs/home');
        }
        else {
          this.varServiceService.presentAlert(result.msg);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
  }
}
