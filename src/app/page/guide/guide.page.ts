import { Component, OnInit, SystemJsNgModuleLoader, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';
export const APP_KEY = 'App';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {

  showSkip = true;
  @ViewChild('slides', { static: false }) slides: IonSlides;

  // constructor() { }
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    // 第一次调用get方法时，'App'这个key不存在，第二个参数会作为默认值返回
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      firstRun: true,
      isLaunched: false,
      version: '1.6.7'
    });
    if (appConfig.firstRun === true) {
      appConfig.firstRun = false;
      this.localStorageService.set('App', appConfig);
    } else {
      this.router.navigateByUrl('guide');
    }
  }

  onSlideWillChange(event) {
    // console.log(event);
    event.target.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

  onSkip(){
    this.router.navigateByUrl('passport/login');
  }
}
