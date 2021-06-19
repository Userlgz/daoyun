import { CourseInfoPageModule } from './../../course/course-info/course-info.module';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { Permission } from './../../../shared/class/permission';
import { User } from './../../../shared/class/user';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

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
    appbrow = '123456';

    constructor(
        private router: Router, private network: NetworkService, private toastCtrl: ToastController,
        private localStorageService: LocalStorageService, private alertCtrl: AlertController,
        private varServiceService: VarServiceService, private networkService: NetworkService,
        private iab: InAppBrowser, private webview: WebView
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
        } else if (this.password === '' && !this.isVerify) {
            const toast = await this.toastCtrl.create({
                message: '请输入您的密码',
                duration: 3000
            });
            toast.present();
        } else if (this.verifyCode.code === '' && this.isVerify) {
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
                    this.varServiceService.reset();
                    this.localStorageService.set('User', this.user);
                    this.permission = result.data.permission;
                    this.localStorageService.set('Permission', this.permission);
                    console.log('login');
                    console.log(this.user);
                    this.router.navigateByUrl('tabs');
                }
                else {
                    // this.varServiceService.presentToast('登录错误');
                    // this.varServiceService.presentToast(result.msg);
                    const alert = await this.alertCtrl.create({
                        header: '提示',
                        message: result.msg,
                        buttons: ['确定']
                    });
                    await alert.present();
                }
            }).catch((error) => {
                this.varServiceService.presentToast('网络出错');
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
    onQuick() {
        this.router.navigateByUrl('/passport/quick');
    }
    onForgotPassword() {
        console.log('forgotpassword');
        this.router.navigateByUrl('/passport/forgotpassword');
    }
    onWeChat() {
        this.varServiceService.presentToast('该功能还在开发!');
        // this.router.navigateByUrl('organization');
        // this.router.navigate(['organization'], { queryParams: {fromUrl: 'passport/login'} });
        // this.networkService.loginByGithub().then((data: any) => {

        //     console.log(data.status);
        //     console.log(data.data); // data received by server
        //     console.log(data.headers);

        // })
        //     .catch(error => {
        //         console.log(error);
        //         console.error(error.status);
        //         console.error(error.error); // error message as string
        //         console.error(error.headers);

        //     });
        // this.brow();
        // console.log('github');
        // this.networkService.loginByGithub().then(async (result: any) => {
        //     console.log('then');
        //     console.log(result);
        // }).catch((error) => {
        //     console.log('error');
        //     console.log(error);
        //     this.varServiceService.presentToast('网络出错');
        // });
    }
    onQQ(){
        this.varServiceService.presentToast('该功能还在开发!');
        // const browser = this.iab.create('https://www.baidu.com/');
        // browser.insertCSS({ code: 'background-color: red;'});
        // // const ls = browser.on('loadstop');
        // // browser.hide();
        // console.log('browser');
        // console.log(browser);
        // browser.on('loadstart').subscribe((event) => {
        //     console.log(event);
        //     this.appbrow = 'appbrow';
        // });
        // browser.close();
    }
    getverifyCode() {
        if (this.username === '') {
            this.varServiceService.presentToast('手机号不能为空!');
        }
        else {
            this.networkService.getverifyCode(this.username, 'login').then(async (result: any) => {
                if (result.code === 200) {
                    this.varServiceService.presentToast(result.msg);
                    this.verifyCode.disable = true;
                    this.settime();
                    // this.verifyCode.disable = false;
                }
                else {
                    this.varServiceService.presentToast(result.code + result.msg);
                }
            }).catch((error) => {
                this.varServiceService.presentToast('网络出错');
            });
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
    brow() {
        // const browser = this.iab.create('https://github.com/login/oauth/authorize?client_id=4ad78bed988e37c07544&state=STATE&redirect_uri=http://120.79.182.99:80/daoyun/callback/git', '_self');
        // browser.show();
        // const browser = this.iab.create('https://github.com/yiershan', '_self');
        // browser.show();
        // browser.on('exit')
        //     .subscribe(
        //         (e) => {
        //             console.log(e.url);
        //         },
        //         err => {
        //             console.log('InAppBrowser loadstart Event Error: ' + err);
        //         });
        // browser.executeScript(...);

        // browser.insertCSS(...);
        // console.log(browser);
        // console.log(browser.on('loadstop'));
        // browser.on('loadstop').subscribe((event) => {
        //     browser.insertCSS({ code: "body{color: red;" });
        //     console.log(event);
        // });

        // browser.on('loadstop').subscribe((event) => {
        //     // browser.insertCSS({ code: "body{color: red;" });
        //     console.log(event);
        // });


        // browser.close();


        const browser = this.iab.create('https://www.baidu.com/');
        browser.insertCSS({ code: 'background-color: red;'});
        // const ls = browser.on('loadstop');
        browser.hide();
        console.log('browser');
        console.log(browser);
        browser.on('loadstart').subscribe((event) => {
            console.log(event);
        });
        browser.close();

    }
}
