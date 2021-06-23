import { VarServiceService } from './../../../shared/service/var-service.service';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/shared/service/network.service';

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
    private networkService: NetworkService,
  ) {
    // this.courseName = varServiceService.getCourseName();
    this.course = VarServiceService.course;
    console.log('cs course');
    console.log(this.course);
    this.courseName = this.course.name;
    // this.delCourse();
  }

  ngOnInit() {
    // this.createCode();
    this.course = VarServiceService.course;
    console.log('cs course');
    console.log(this.course);
    this.courseName = this.course.name;
  }
  delCourse() {
    this.course.isFinish = true;
    this.networkService.updateCourse(this.course, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.varServiceService.presentToast('结束成功');
      }
      else {
        this.varServiceService.presentToast(result.msg);
        // this.presentAlert(result.msg);
        // console.log(result);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }
  onJoinChange(event) {
    console.log(event.detail.checked);
    this.course.isJoin = event.detail.checked;
    console.log(this.course);
    this.networkService.updateCourse(this.course, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        if (this.course.isJoin) {
          this.varServiceService.presentToast('允许加入');
        }
        else{
          this.varServiceService.presentToast('不允许加入');
        }
      }
      else {
        this.varServiceService.presentToast(result.msg);
        // this.presentAlert(result.msg);
        // console.log(result);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }
}
