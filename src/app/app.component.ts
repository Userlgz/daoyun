import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.overlaysWebView(true);
      // this.statusBar.styleDefault();
      this.checkPermissions();
    });
  }

  checkPermissions() {
    // @ts-ignore
    // tslint:disable-next-line: one-variable-per-declaration
    const permissions = cordova.plugins.permissions,
      permissionList = [permissions.CAMERA, permissions.WRITE_EXTERNAL_STORAGE, permissions.INTERNET, permissions.ACCESS_NETWORK_STATE];
    function errorCallback() {
      console.warn("permissions is not turned on");
    }
    function checkPermissionCallback(status) {
      if (!status.hasPermission) {
        permissions.requestPermissions(
          permissionList,
          status => {
            if (!status.hasPermission) errorCallback();
          },
          errorCallback);
      }
    }
    permissions.hasPermission(permissionList, checkPermissionCallback, null);
  }
}
