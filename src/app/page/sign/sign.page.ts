import { NetworkService } from './../../shared/service/network.service';
import { Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
import PatternLock from 'patternlock';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
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
  signRecords = [];
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
  // @ViewChild('map') map_container: ElementRef;
  constructor(
    private geolocation: Geolocation,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.getLocation();
    this.getSign();
  }
  getSign() {
    this.networkService.getSignofCourse(VarServiceService.courseID,
      this.varServiceService.getUser().token).then(async (result: any) => {
        console.log(result);
        if (result.code === 200) {
          this.signRecords = result.data;
        }
      });
  }
  onOneClick() {

  }
  onLimitTime() {

  }
  onGesture() {
    this.router.navigateByUrl('sign/gesture');
  }
  onManual() {

  }
  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {

      // if (resp && resp.coords) {

      //   let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);

      //   let convertor = new BMap.Convertor();

      //   let pointArr = [];

      //   pointArr.push(locationPoint);

      //   convertor.translate(pointArr, 1, 5, (data) => {

      //     if (data.status === 0) {

      //       let marker = new BMap.Marker(data.points[0], { icon: this.myIcon });

      //       this.map.panTo(data.points[0]);

      //       marker.setPosition(data.points[0]);

      //       this.map.addOverlay(marker);

      //     }

      //   });

      //   this.map.centerAndZoom(locationPoint, 13);
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
