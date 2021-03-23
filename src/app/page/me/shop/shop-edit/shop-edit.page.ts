import { LocalStorageService } from './../../../../shared/service/local-storage.service';
import { User } from './../../../../shared/class/user';
import { ToastController } from '@ionic/angular';
import { SettingServiceService } from './../../setting/setting-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {
  title: string;
  property: string;
  value: string; // 用于ngModel，从shop对象的相关属性中获取数据
  constructor(private activatedRoute: ActivatedRoute, private settingService: SettingServiceService,
              private localStorageService: LocalStorageService, private toastCtrl: ToastController,
              private router: Router) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });

  }

  ngOnInit() {
  }

  async onSave() {
    const users = this.localStorageService.get('users');
    let user = this.localStorageService.get('loginuser');
    this.settingService.user[this.property] = this.value;
    users[this.settingService.user.id] = this.settingService.user;
    user = this.settingService.user;
    const toast = await this.toastCtrl.create({
      message: '保存成功',
      duration: 3000
    });
    toast.present();
    this.localStorageService.set('users', users);
    this.localStorageService.set('loginuser', user);
    console.log(this.settingService.user);
    this.router.navigateByUrl('/me/shop');
  }
}
