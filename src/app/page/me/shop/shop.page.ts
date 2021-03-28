import { SettingServiceService } from './../../../shared/service/setting-service.service';
import { LocalStorageService } from './../../../shared/service/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  shop: any;
  signup: any;
  loginuser: any;
  constructor(private localStorageService: LocalStorageService, private settingService: SettingServiceService) {
    // this.loginuser = this.localStorageService.get('loginuser');
    this.loginuser = settingService.getUser();
  }

  ngOnInit() {
  }
  getUser(){
    return this.loginuser;
  }
}
