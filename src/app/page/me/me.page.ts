import { PassportServiceService } from './../../shared/service/passport-service.service';
import { APP_KEY } from './../guide/guide.page';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/shared/class/user';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  version = '';
  name = '';
  id = '';
  user: User = null;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private alertController: AlertController,
    private passportService: PassportServiceService) {
    const appConfig: any = this.localStorageService.get(APP_KEY, null);
    this.version = appConfig.version;
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.user = this.passportService.getUser();
  }
  // 下拉刷新
  refreshData(event) {
    this.getData();
    this.localStorageService.set('User', this.user);
    event.target.complete();
  }
  openSetInformation() {
    this.router.navigateByUrl('me/user-info');
  }
  openAboutUs() {
    this.router.navigateByUrl('me/about-us');
  }
  // 退出登录
  async onLogout() {
    const alert = await this.alertController.create({
      animated: true,
      message: '确认退出？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //  console.log('Confirm Cancel');
          }
        }, {
          text: '退出',
          cssClass: 'danger',
          handler: () => {
            //  console.log('Confirm Delete');
            const app = this.localStorageService.get('App', []);
            app.isLaunched = false;  // 将APP的登录状态设置为false
            this.localStorageService.set(APP_KEY, app);
            this.localStorageService.remove('User');
            this.localStorageService.remove('loginTime');
            this.name = '请下拉刷新';
            this.id = '';
            this.router.navigateByUrl('/passport/login');
          }
        }
      ]
    });
    await alert.present();
  }
  // 检查升级
  async checkUpdate() {
    //  判断是否为最新版本
    const alert = await this.alertController.create({
      animated: true,
      message: '当前为最新版本!',
      buttons: ['确定']
    });
    alert.present();
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
      this.localStorageService.set('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.localStorageService.set('data-theme', 'light');
    }
  }

  //  点击忘记密码时调用
  openForgotPassword() {
    //  进入找回密码页面
    this.router.navigate(['me/change-password'], {
      queryParams: {
        page: 0
      }
    });
  }

}
