import { Router, Params } from '@angular/router';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { VarServiceService } from 'src/app/shared/service/var-service.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  courseName = '';
  courseId = '';
  totalExperience: number;
  // students = [];
  sortStudent: any;

  students = [];

  isJoin = true;

  constructor(
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private router: Router
  ) {
    this.isJoin = VarServiceService.isJoin;
    this.courseName = varServiceService.getCourseName();
    this.courseId = varServiceService.getCourseID();
    this.getStudents();
  }

  ngOnInit() {
    this.isJoin = VarServiceService.isJoin;
  }

  onClick() {
    this.varServiceService.presentToast('正在研发中...');
  }

  onStuInfo(event) {
    console.log(event);
  }
  getStudents() {
    this.networkService.getCoursesMembers(this.varServiceService.getCourseID(),
      this.varServiceService.getUser().token).then(async (result: any) => {
        // console.log(this.students);
        if (result.code === 200) {
          this.students = result.data.userList;
          this.students.sort(this.sortExperience);
          this.totalExperience = result.data.totalExperience;
          // this.presentAlert(result.msg);
          // this.router.navigateByUrl('passport/login');
          // console.log(this.students[0]);
        }
        else {
          // this.presentAlert(result.msg);
          console.log(result);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
  }
  sortExperience(b, a) {
    return a.experience - b.experience;
  }
  toMemberInfo(num) {
    const param = this.students[num];
    param.totalExperience = this.totalExperience;
    // this.students[num].fff = 232;
    console.log(param);
    this.router.navigate(['course/member-info'], { queryParams: param });
  }
  onSign() {
    console.log(this.courseId);
    if (this.isJoin) {
      let runSign = [];
      console.log('onSign');
      this.networkService.getCourseRunSign(VarServiceService.courseID, this.varServiceService.getUser().token).then(async (result: any) => {
        if (result.code === 200) {
          runSign = result.data;
          if (runSign.length > 0) {
            if (runSign[0].parameter.name === '手势签到') {
              this.router.navigateByUrl('sign/gesture');
            }
            else {
              this.router.navigateByUrl('sign/sign-in');
            }
          }
          else {
            this.varServiceService.presentToast('还没有开始签到!');
            return;
          }
        }
        else {
          this.varServiceService.presentToast(result.code + result.msg);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
    else {
      this.router.navigateByUrl('sign');
    }
  }
  refreshData(event) {
    this.networkService.getCoursesMembers(this.varServiceService.getCourseID(),
      this.varServiceService.getUser().token).then(async (result: any) => {
        if (result.code === 200) {
          this.students = result.data.userList;
          this.totalExperience = result.data.totalExperience;
        }
        else {
          console.log(result.code + result.msg);
        }
        event.target.complete();
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
        event.target.complete();
      });
  }
}
