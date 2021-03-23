import { LocalStorageService } from './../../../shared/service/local-storage.service';
import { SettingServiceService } from './setting-service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService,
              private navCtrl: NavController, private router: Router,
              private settingService: SettingServiceService) { }
  private version: any = '';

  ngOnInit() {
    const user = this.localStorageService.get('user', '');
    const app = this.localStorageService.get('App', '');
    this.version = app.version;
  }

  onLogout() {
    const config = this.localStorageService.get('App', '');
    config.isLaunched = false;
    this.localStorageService.set('App', config);
    this.router.navigateByUrl('/passport/login');
  }
  // onCall(phoneNumber: number) {
  //   window.location.href = 'tel:' + phoneNumber;
  // }
  get user(){
    return this.settingService;
  }
}
