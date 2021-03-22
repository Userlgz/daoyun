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

    constructor(
        private router: Router, private network: NetworkService, private toastCtrl: ToastController,
        private localStorageService: LocalStorageService, private alertCtrl: AlertController
    ) { }

    ngOnInit() {
    }

    // 点击登录按钮时调用
    async onLogin(form: NgForm) {
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
            this.network.login(this.username, this.password).then(async (result: any) => {
                console.log(result);
                this.code = result.code;
                console.log(this.code);
                if (this.code === 200) {
                    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    this.localStorageService.set('loginTime', loginTime);
                    const config = this.localStorageService.get('App', '');
                    config.isLaunched = true;
                    this.localStorageService.set('App', config);
                    this.router.navigateByUrl('/tabs');
                }
                else {
                    const alert = await this.alertCtrl.create({
                        header: '提示',
                        message: '用户名或者密码不正确',
                        buttons: ['确定']
                    });
                    alert.present();
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
}
