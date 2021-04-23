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

  user = {
    phone: '',
    name: '',
    birth: '',
    sex: '',
    photo: '',
    school: '',
    college: '',
    entryYear: '',
    userId: '',
    createTime: '',
    token: '',
  };

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
    this.showSchool();
  }

  ngOnInit() {
    this.user = this.passportService.getUser();
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
        console.log(queryParams);
        this.user.school = queryParams.schoolname;
        this.user.college = queryParams.collegename;
        // console.log(this.course);
      }
    );
  }

  onEdit() {
    this.isEdit = true;
  }

  onSubmit() {
    this.isEdit = false;
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
