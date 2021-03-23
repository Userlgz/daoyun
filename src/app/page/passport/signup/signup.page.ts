import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signup = {
    name: '', // 真实姓名
    school: '', // 学校
    phone: '', // 手机号
    major: '', // 专业
    identity: 'student', // 学生、老师
    id: null,  // 学号、工号
    password: '',
    confirmPassword: '',
  };

  isStudent = true;


  constructor() { }

  ngOnInit() {
  }

}
