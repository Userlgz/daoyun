import { User } from './../../../shared/class/user';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { PassportServiceService } from 'src/app/shared/service/passport-service.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  isEdit = false; // 编辑状态
  isStudent = true; // 是否是学生
  identity = '';

  user: User = null;

  colleges: any = null;
  schools: any = null;
  isCollegeShow = true;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private passportService: PassportServiceService,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.user = this.varServiceService.getUser();
    console.log('asdgfagagr');
    console.log(this.user);
    // if (this.user.permission === 2) {
    //   this.identity = '老师';
    // }
    // else if (this.user.permission === 3) {
    //   this.identity = '学生';
    // }
    this.identity = this.varServiceService.getPermission().name;
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {

        if (queryParams.schoolname) {
          console.log('user-info');
          this.user.school = queryParams.schoolname;
          this.user.college = queryParams.collegename;
        }
        else {
          console.log(queryParams);
        }

        // console.log(this.course);
      }
    );
  }

  onEdit() {
    this.isEdit = true;
  }

  onSubmit() {
    this.isEdit = false;
    console.log('submit');
    console.log(this.user);
    this.networkService.updateUserInfo(this.user, this.user.token).then((async (result: any) => {
      this.varServiceService.presentToast(result.msg);
    }));
    this.passportService.setUser(this.user);
    this.varServiceService.reset();
  }
  showSchool() {
    // console.log();
    this.networkService.getSchool().then(async (result: any) => {
      if (result.code === 200) {
        this.schools = result.data;
      }
      else {
        this.varServiceService.presentToast('获取学校失败!');
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }
  showCollege(schoolId) {
    // console.log();
    if (schoolId === null) {
      this.varServiceService.presentToast('请先选择学校');
    }
    else {
      this.networkService.getCollege(schoolId).then(async (result: any) => {
        if (result.code === 200) {
          this.colleges = result.data;
          this.isCollegeShow = false;
        }
        else {
          this.varServiceService.presentToast('获取学院失败!');
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
  }
  onChangeschool(event) {
    this.user.school = event.detail.value.name;
    console.log('onChangeschool: ' + this.user.school);
    this.showCollege(event.detail.value.id);
  }

  onChangecollege(event) {
    console.log('onChangecollege: ' + this.user.college);
    // console.log(event);
  }
}
