import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/shared/service/network.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  isFinish = false;
  width = 0;
  signList = [];
  longitude: any;
  latitude: any;
  pText = '经纬度';
  signTime = '';
  signTextShow = true;

  constructor(
    private geolocation: Geolocation,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
  ) {
    // this.getLocation();
    // this.getSign();
  }

  ngOnInit() {
    this.width = document.body.offsetWidth * 0.3;
    this.getLocation();
    this.getSign();
  }
  getSign() {
    this.networkService.searchSigning(VarServiceService.courseID, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.signList = result.data;
        // console.log(result);
        // console.log(this.signList);
        // console.log(this.signList.length);
      }
      else {
        this.varServiceService.presentToast(result.code + result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }
  onSignIn() {
    console.log('OnSignIn');
    // this.networkService.searchSigning(VarServiceService.courseID, this.varServiceService.getUser().token).then(async (result: any) => {
    //   if (result.code === 200) {
    //     this.signList = result.data;
    //     console.log(result);
    //     console.log(this.signList);
    //     console.log(this.signList.length);
    // this.router.navigateByUrl('sign/signing');
    if (this.signList.length === 0) {
      this.varServiceService.presentToast('还没有开始签到!');
      return;
    }
    const end = new Date(this.signList[0].endTime.replace(/-/g, '/')); // 结束时间
    const curr = new Date().getTime();
    const diff = end.getTime() - curr;
    console.log('onSignIn diff', diff);
    if (diff < 0) {
      this.varServiceService.presentToast('签到已结束!');
      this.router.navigateByUrl('tabs');
      return;
    }
    const sign = {
      signId: this.signList[0].id,
      userId: this.varServiceService.getUser().id,
      longitude: this.longitude,
      latitude: this.latitude,
      passport: this.signList[0].passport,
    };
    this.networkService.joinSign(sign, this.varServiceService.getUser().token).then(async (joinSign: any) => {
      if (joinSign.code === 200) {
        // this.varServiceService.presentAlert('签到成功');
        this.signTextShow = !this.signTextShow;
        const cur = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
        this.signTime = cur.toString();
        console.log(joinSign);
      }
      else {
        this.varServiceService.presentToast(joinSign.code + joinSign.msg);
      }
    }).catch((joinSignerror) => {
      this.varServiceService.presentToast('网络出错');
      console.log(joinSignerror);
    });
    // }
    //   else {
    //     this.varServiceService.presentToast(result.code + result.msg);
    //   }
    // }).catch((error) => {
    //   this.varServiceService.presentToast('网络出错');
    // });
  }
  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.pText = 'GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude;
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;

    }).catch(e => {

      console.log('Error happened when get current position.');

    });

  }
}
