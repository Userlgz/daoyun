import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../shared/class/user';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    code: '',
    codeLength: 4,
    countdown: 60,
    disable: false,
    fail: false// 验证失败
  };
  signup = {
    name: '', // 真实姓名
    school: '', // 学校
    college: '', // 学院
    phone: '', // 手机号
    permission: 3, // 学生、老师
    userId: '',  // 学号、工号
    password: '',
    entryYear: '2020',
    verifyCode: null, // 验证码
  };
  confirmPassword = '';
  isStudent = true;

  message: any = null;

  colleges: any = null;
  schools: any = null;

  isCollegeShow = true;

  constructor(
    private alertController: AlertController, private networkService: NetworkService,
    private router: Router, private varServiceService: VarServiceService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.showSchool();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.signup.school = queryParams.schoolname;
        this.signup.college = queryParams.collegename;
        // console.log(this.course);
      }
    );
  }

  getverifyCode() {
    if (this.signup.phone === '') {
      this.varServiceService.presentToast('手机号不能为空!');
    }
    else {
      this.networkService.getverifyCode(this.signup.phone, 'register');
      this.verifyCode.disable = true;
      this.settime();
    }
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

  onSubmit() {
    console.log(this.signup);
    if (this.signup.name === '') {
      this.varServiceService.presentToast('姓名不能为空!');
    }
    else if (this.signup.phone === '') {
      this.varServiceService.presentToast('手机号不能为空!');
    }
    else if (String(this.signup.phone).length !== 11) {
      // console.log(this.signup.tel.length)
      this.varServiceService.presentToast('手机号格式不正确!');
    }
    else if (this.signup.userId === '') {
      this.varServiceService.presentToast('学号不能为空!');
    }
    else if (String(this.signup.userId).length >= 9) {
      this.varServiceService.presentToast('学号或工号不能超过九位!');
    }
    else if (this.signup.password === '') {
      this.varServiceService.presentToast('密码不能为空!');
    }
    else if (this.confirmPassword === '') {
      this.varServiceService.presentToast('确认密码不能为空!');
    }
    else if (this.confirmPassword !== this.signup.password) {
      this.varServiceService.presentToast('两次输入的密码不相同!');
    }
    else if (this.signup.verifyCode === '') {
      this.varServiceService.presentToast('验证码不能为空!');
    }
    // else if (this.signup.permission === '') {
    //   this.varServiceService.presentToast('验证码不能为空!');
    // }
    else { // 必填信息都填了，而且没有错
      this.networkService.signup(this.signup).then(async (result: any) => {
        if (this.signup.permission === 3) {
          // this.message = ;
        }
        else { // 老师

        }
        if (result.code === 200) {
          this.varServiceService.presentToast(result.msg);
          this.router.navigateByUrl('passport/login');
        }
        else {
          this.varServiceService.presentToast(result.msg);
        }
      });
    }
  }

  onChangepermission(event) {
    console.log('onChangepermission: ' + this.signup.permission);
    this.signup.permission = event.detail.value;
    // console.log(event);
  }

  onChangeschool(event) {
    this.signup.school = event.detail.value.name;
    console.log('onChangeschool: ' + this.signup.school);
    this.showCollege(event.detail.value.id);
  }

  onChangecollege(event) {
    console.log('onChangecollege: ' + this.signup.college);
    // console.log(event);
  }

  settime() {
    if (this.verifyCode.countdown === 1) {
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = '重新获取';
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
      this.settime();
    }, 1000);
  }

}
