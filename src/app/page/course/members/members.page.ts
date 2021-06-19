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

  constructor(
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private router: Router
  ) {
    this.courseName = varServiceService.getCourseName();
    this.courseId = varServiceService.getCourseID();
    this.getStudents();
  }

  ngOnInit() {
  }

  onClick() {
    console.log('aedrfhaetjwrtyjwykjeytkeutk');
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
          this.totalExperience = result.data.totalExperience;
          // this.presentAlert(result.msg);
          // this.router.navigateByUrl('passport/login');
          console.log(this.students[0]);
        }
        else {
          // this.presentAlert(result.msg);
          console.log(result);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
  }
  toMemberInfo(num) {
    const param = this.students[num];
    param.totalExperience = this.totalExperience;
    // this.students[num].fff = 232;
    console.log(param);
    this.router.navigate(['course/member-info'], { queryParams: param });
  }
  onSign(){
    console.log(this.courseId);
    // this.varServiceService.setCourseName(courseId);
    // this.varServiceService.setCourseID(courseId);
    this.router.navigateByUrl('sign');
  }
}
