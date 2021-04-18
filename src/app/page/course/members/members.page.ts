import { Router } from '@angular/router';
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
  // students = [];
  sortStudent: any;

  students = [];

  constructor(
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private router: Router
  ) {
    this.courseName = varServiceService.getCourseName();
    this.getStudents();
   }

  ngOnInit() {
  }

  onClick(){
    console.log('aedrfhaetjwrtyjwykjeytkeutk');
  }

  onStuInfo(event){
    console.log(event);
  }
  getStudents(){
    this.networkService.getCoursesMembers(this.varServiceService.getCourseID(),
     this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.students = result.data;
        // this.presentAlert(result.msg);
        // this.router.navigateByUrl('passport/login');
        console.log(this.students[0]);
      }
      else {
        // this.presentAlert(result.msg);
        console.log(result);
      }
    });
  }
  toMemberInfo(num){
    this.router.navigate(['course/member-info'], { queryParams: this.students[num] });
  }
}
