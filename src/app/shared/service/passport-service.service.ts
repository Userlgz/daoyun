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
    ) { }

  /**
   *
   *
   * @ param {Signup} signup
   * @ return {*}  {boolean}
   * @ memberof PassportServiceService
   */
  signUp(user: User): boolean {
    // signUp(phone: string, email: string, password: string, shopname: string): boolean {
    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    // user.creatTime = time;
    // this.localStorageService.get('App', {
    //   isLaunched: false,
    //   version: '1.0.0'
    // });
    // console.log(user);
    // this.localStorageService.set('signupTime', time);
    return true;
  }

  /**
   *
   *
   * @ param {string} account,
   * @ param {string} password,
   * @ return {*}  {boolean},
   * @ memberof PassportServiceService,
   */
  login(account: string, password: string): boolean {
    const users = this.localStorageService.get('users', '');
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
      if ((account === users[i].login1.identifier && password === users[i].login1.credential) ||
        (account === users[i].login2.identifier && password === users[i].login2.credential)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('未注册');
      return false;
    }
    const loginuser: any = this.localStorageService.get('loginuser', users[i]);
    this.localStorageService.set('loginuser', loginuser);
    const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.localStorageService.set('loginTime', loginTime);
    return true;
  }
  valid(account: string, password: string): boolean {
    const users = this.localStorageService.get('users', '');
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
      if ((account === users[i].login1.identifier && password === users[i].login1.credential) ||
        (account === users[i].login2.identifier && password === users[i].login2.credential)) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('账号或密码错误');
      return false;
    }
    return true;
  }
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
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log('未注册');
      return 'false';
    }
    return users[i].login1.credential;
  }
  getUser(): User {
    const user = this.localStorageService.get('User', '');
    // console.log('account:' + account + ' ' + password);
    if (user === null) {
      console.log('未注册');
      return null;
    }
    return user;
  }
  getUserId(): User {
    const user = this.localStorageService.get('user', '');
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

  async presentAlert(message) {
    const alert = await this.alertController.create({
      animated: true,
      mode: 'ios',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
