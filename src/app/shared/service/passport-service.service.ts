import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { LocalStorageService } from './../../shared/service/local-storage.service';
import { User } from './../../shared/class/user';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private varServiceService: VarServiceService,
    ) { }

  forgetpassword(account: string) {
    const users = this.localStorageService.get('users', '');
    // console.log('account:' + account + ' ' + password);
    let flag = false;
    let len: number;
    if (users === null) {
      len = 0;
    }
    else {
      len = users.length;
    }
    for (let i = 0; i < len; i++) {
      if ((account === users[i].login1.identifier) || (account === users[i].login2.identifier)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('未注册');
      return false;
    }
  }
  getPassword(): string {
    return this.varServiceService.getUser().password;
  }
  getUser(): User {
    const user = this.varServiceService.getUser();
    // console.log('account:' + account + ' ' + password);
    if (user === null) {
      console.log('未注册');
      return null;
    }
    return user;
  }
  getUserId(): User {
    const user = this.localStorageService.get('User', '');
    // console.log('account:' + account + ' ' + password);
    if (user === null) {
      console.log('未注册');
      return null;
    }
    return user.id;
  }
  updatePassword(password: string): boolean {
    const users = this.localStorageService.get('users', '');
    const user = this.localStorageService.get('loginuser', '');
    // console.log('account:' + account + ' ' + password);
    let flag = false;
    let len: number;
    let i = 0;
    if (users === null) {
      len = 0;
    }
    else {
      len = users.length;
    }
    // console.log(len);
    for (i = 0; i < len; i++) {
      if ((user.login1.identifier === users[i].login1.identifier) ||
        (user.login2.identifier === users[i].login2.identifier)) {
        users[i].login1.credential = password;
        users[i].login2.credential = password;
        users[i].password = password;
        user.login1.credential = password;
        user.login2.credential = password;
        user.password = password;
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('未注册');
      return false;
    }
    this.localStorageService.set('users', users);
    this.localStorageService.set('loginuser', user);
    return true;
  }
}
