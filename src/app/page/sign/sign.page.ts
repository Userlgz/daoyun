import { Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
import PatternLock from 'patternlock';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  @ViewChild('map') map_container: ElementRef;
  constructor(
    private geolocation: Geolocation,
  ) {
    // this.canvas = document.getElementById('lockCanvass');
    // this.canvasWidth = document.body.offsetWidth;  //  网页可见区域宽
    // this.canvas = document.getElementById('lockCanvass');
    // this.currheight = this.getTop(this.canvas);
    // this.currheight = document.getElementById('lockCanvass').offsetTop;
    //
    this.getLocation();
  }
  ngOnInit() {
  }
  ionViewDidLoad() {

    //Amin: !Important:map_container shoud be called here, it can't be inited in constructor, if called in constructor

    this.map = new BMap.Map('map_container');

    this.map.centerAndZoom('上海', 13);

    this.map.enableScrollWheelZoom(true);

    this.myGeo = new BMap.Geocoder();

    var geolocationControl = new BMap.GeolocationControl();

    this.map.addControl(geolocationControl);

    this.getLocation();

  }

  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {

      if (resp && resp.coords) {

        let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);

        let convertor = new BMap.Convertor();

        let pointArr = [];

        pointArr.push(locationPoint);

        convertor.translate(pointArr, 1, 5, (data) => {

          if (data.status === 0) {

            let marker = new BMap.Marker(data.points[0], { icon: this.myIcon });

            this.map.panTo(data.points[0]);

            marker.setPosition(data.points[0]);

            this.map.addOverlay(marker);

          }

        });

        this.map.centerAndZoom(locationPoint, 13);

        console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
        this.longitude = resp.coords.longitude;
        this.latitude = resp.coords.latitude;

      }

    }).catch(e => {

      console.log('Error happened when get current position.');

    });

  }
}
