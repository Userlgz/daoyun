import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { Permission } from './../../../shared/class/permission';
import { User } from './../../../shared/class/user';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    username = '';
    password = '';
    code = 0;
    user: User;
    permission: Permission;
    verifyCode: any = {
        verifyCodeTips: '获取验证码',
        code: '',
        codeLength: 4,
        countdown: 60,
        disable: false,
        fail: false// 验证失败
    };
    isVerify = false;
    loginResult: any;

    constructor(
        private router: Router, private network: NetworkService, private toastCtrl: ToastController,
        private localStorageService: LocalStorageService, private alertCtrl: AlertController,
        private varServiceService: VarServiceService, private networkService: NetworkService
    ) { }

    ngOnInit() {
    }

    // 点击登录按钮时调用
    async onLogin() {
        // 账号为空时提示输入账号
        if (this.username === '') {
            const toast = await this.toastCtrl.create({
                message: '请输入您的手机号码或者邮箱',
                duration: 3000
            });
            toast.present();
        } else if (this.password === '') {
            const toast = await this.toastCtrl.create({
                message: '请输入您的密码',
                duration: 3000
            });
            toast.present();
        } else {
            // 密码不对时提示错误
            if (this.isVerify) {
                this.loginResult = this.network.loginByCode(this.username, this.verifyCode.code);
            }
            else {
                this.loginResult = this.network.login(this.username, this.password);
            }

            this.loginResult.then(async (result: any) => {
                console.log(result);
                this.code = result.code;
                console.log(this.code);
                if (this.code === 200) {
                    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    this.localStorageService.set('loginTime', loginTime);
                    const config = this.localStorageService.get('App', '');
                    config.isLaunched = true;
                    this.localStorageService.set('App', config);
                    this.user = result.data.user;
                    this.localStorageService.set('User', this.user);
                    this.permission = result.data.permission;
                    this.localStorageService.set('Permission', this.permission);
                    console.log(this.user.name);
                    this.router.navigateByUrl('tabs');
                }
                else {
                    // this.varServiceService.presentToast('登录错误');
                    this.varServiceService.presentToast(result.msg);
                    const alert = await this.alertCtrl.create({
                        header: '提示',
                        message: '用户名或者密码不正确',
                        buttons: ['确定']
                    });
                    await alert.present();
                }
            });
            // if (!this.passportService.login(this.username, this.password)) {
            //     const alert = await this.alertCtrl.create({
            //         header: '提示',
            //         message: '用户名或者密码不正确',
            //         buttons: ['确定']
            //     });
            //     alert.present();
            // } else {
            //     const config = this.localStorageService.get('App', '');
            //     config.isLaunched = true;
            //     this.localStorageService.set('App', config);
            //     this.router.navigateByUrl('/tabs');
            // }
        }
    }
    onSignup() {
        console.log('signup');
        this.router.navigateByUrl('/passport/signup');
    }
    onForgotPassword() {
        console.log('forgotpassword');
        this.router.navigateByUrl('/passport/forgotpassword');
    }
    onWeChat() {
        // this.router.navigateByUrl('organization');
        // this.router.navigate(['organization'], { queryParams: {fromUrl: 'passport/login'} });
    }
    getverifyCode() {
        if (this.username === '') {
            this.varServiceService.presentToast('手机号不能为空!');
        }
        else {
            this.networkService.getverifyCode(this.username, 'login');
            this.verifyCode.disable = true;
            this.settime();
        }
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
    onVerifyCodeLogin() {
        this.isVerify = !this.isVerify;
    }
}
