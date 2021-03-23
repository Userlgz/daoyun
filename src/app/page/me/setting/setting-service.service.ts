import { PassportServiceService } from './../../passport/passport-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {
  user: any = {};
  appconfig: any = {};

  constructor(private passportService: PassportServiceService) {
    this.user = passportService.getUser();
    // this.user = shop.getUser();
  }
  load(userFormLogin: any){
    const shop: any = {};
    this.user = {
      ...userFormLogin
    };
  }
  getUser(){
    return this.user;
  }
}
