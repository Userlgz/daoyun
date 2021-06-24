import { APP_KEY } from './../page/guide/guide.page';
import { LocalStorageService } from './../shared/service/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      firstRun: true,
      isLaunched: false,
      version: '1.6.7',
      phone: '13124005166',
      code: '03'
    });
    if (appConfig.firstRun === true) {
      appConfig.firstRun = false;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      const current = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
      const loginTime = this.localStorageService.get('loginTime', '1995-10-20 00:00:00').replace(/-/g, '/');
      const sTime = new Date(current); // 开始时间
      const eTime = new Date(loginTime); // 结束时间
      const differ: any = ((sTime.getTime() - eTime.getTime()) / 1000 / 60 / 60).toFixed(0);  // 小时数

      // console.log(sTime, eTime, differ);
      if (differ - 5 > 0) {
        this.router.navigateByUrl('passport/login');
      } else {
        this.router.navigateByUrl('tabs/home');
      }
      return false;
    }
  }
}
