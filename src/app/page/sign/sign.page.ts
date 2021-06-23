import { NetworkService } from './../../shared/service/network.service';
import { Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
import PatternLock from 'patternlock';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { PickerService } from 'src/app/shared/service/picker.service';
import { range } from 'rxjs';
// declare var PatternLock: any;
declare var BMap;

declare var BMapLib;
@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  map: any;

  myGeo: any;

  myIcon: any;
  longitude: any;
  latitude: any;
  pText = '经纬度';
  signRecords = [
    // {
    //   beginTime: '2021-06-08 16:31:34',
    //   parameter: {
    //     name: '123'
    //   }
    // },
    // {
    //   beginTime: '2021-06-08 16:31:34',
    //   parameter: {
    //     name: '123'
    //   }
    // },
  ];
  termOptions = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    ['小时'],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
      46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    ['分钟']
  ];
  minutes = 0;
  isJoin = true;
  // "id": 1,
  // "beginTime": "2021-04-08 16:29:17",
  // "endTime": "2021-04-10 22:09:50",
  // "type": 2,
  // "courseId": 1,
  // "passport": "123456",
  // "longitude": 1.0,
  // "latitude": 1.0,
  // "parameter": {
  //   "id": 2,
  //   "experience": 2,
  //   "distance": 100,
  //   "limitTime": 9999,
  //   "name": "手势签到"
  // },
  // "finish": true
  constructor(
    private geolocation: Geolocation,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
    public pickerService: PickerService,
  ) {
    this.isJoin = VarServiceService.isJoin;
    this.getLocation();
    this.getSign();
  }
  ngOnInit() {
    this.isJoin = VarServiceService.isJoin;
    // for (let i = 1; i < 60; i++) {
    //   this.termOptions[0].push(i);
    // }
    if (VarServiceService.startSign) {
      this.varServiceService.presentAlert('您还有未结束的签到');
      this.router.navigateByUrl('sign/signing');
    }
    this.getLocation();
    this.getSign();
  }
  getSign() {
    this.networkService.getSignofCourse(VarServiceService.courseID,
      this.varServiceService.getUser().token).then(async (result: any) => {
        console.log(result);
        if (result.code === 200) {
          this.signRecords = result.data;
          console.log('getSign');
          console.log(result);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
  }
  onOneClick() {
    const sign = {
      courseId: this.varServiceService.getCourseID(),
      isFinish: 0,
      longitude: this.longitude,
      latitude: this.latitude
    };
    // this.sign.courseId = this.varServiceService.getCourseID();
    console.log('onOneClick', VarServiceService.startSign);
    if (!VarServiceService.startSign) {
      this.networkService.createSign('one', sign, this.varServiceService.getUser().token).then(async (result: any) => {
        if (result.code === 200) {
          this.varServiceService.presentAlert('请提醒学生开始签到！');
          console.log(result);
          this.router.navigateByUrl('sign/signing');
        }
        else {
          this.varServiceService.presentToast(result.code + result.msg);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
    else {
      this.varServiceService.presentAlert('您还有未结束的签到');
      this.router.navigateByUrl('sign/signing');
    }
  }
  onLimitTime() {
    // 2, termOptions[0].length, termOptions, '时间'
    const sign = {
      courseId: this.varServiceService.getCourseID(),
      isFinish: 0,
      longitude: this.longitude,
      latitude: this.latitude,
      limit: 1,
    };
    const that = this;
    this.pickerService.openPicker(4, 60, this.termOptions, [0, 1], (result) => {
      console.log(result);
      this.minutes = JSON.parse(result)['col-0'].text * 60 + JSON.parse(result)['col-2'].text;
      if (this.minutes === 0) {
        this.varServiceService.presentToast('至少需要一分钟');
      }
      else {
        sign.limit = this.minutes;
        if (!VarServiceService.startSign) {
          this.networkService.createSign('limit', sign, this.varServiceService.getUser().token).then(async (createSign: any) => {
            if (createSign.code === 200) {
              this.varServiceService.presentAlert('请提醒学生开始签到！');
              console.log(createSign);
              this.router.navigateByUrl('sign/signing');
            }
            else {
              this.varServiceService.presentToast(createSign.code + createSign.msg);
            }
          }).catch((error) => {
            this.varServiceService.presentToast('网络出错');
          });
          console.log(this.minutes);
        }
        else {
          this.varServiceService.presentAlert('您还有未结束的签到');
          this.router.navigateByUrl('sign/signing');
        }
      }
    });
  }
  onGesture() {
    // 2
    // this.router.navigate(['sign/gesture'], { queryParams: { longitude: this.longitude, latitude: this.latitude } });
    this.router.navigateByUrl('sign/gesture');
  }
  onManual() {

  }
  toSignInfo(item) {
    console.log(item);
    this.router.navigate(['sign/sign-record'], { queryParams: { signid: item.id } });
    // this.router.navigateByUrl('sign/sign-record');
  }
  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.pText = 'GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude;
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;

      // }

    }).catch(e => {

      console.log('Error happened when get current position.');

    });

  }
}
