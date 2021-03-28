import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  isEdit = 0; // 编辑状态
  isStudent = 0; // 是否是学生
  identity = '';
  userId = '';

  constructor() { }

  ngOnInit() {
  }

}
