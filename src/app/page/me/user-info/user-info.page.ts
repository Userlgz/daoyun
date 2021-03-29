import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { PassportServiceService } from 'src/app/shared/service/passport-service.service';

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
    permission: 3,
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


  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private passportService: PassportServiceService
  ) { }

  ngOnInit() {
    this.user = this.passportService.getUser();
    console.log(this.user);
    if (this.user.permission === 2) {
      this.identity = '老师';
    }
    else if (this.user.permission === 3) {
      this.identity = '学生';
    }
  }

  onEdit() {
    this.isEdit = true;
  }

  onSubmit(){
    this.isEdit = false;
  }
}
