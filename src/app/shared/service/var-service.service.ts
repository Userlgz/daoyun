import { async } from '@angular/core/testing';
import { Permission } from './../class/permission';
import { LocalStorageService } from './local-storage.service';
import { User } from './../class/user';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VarServiceService {


  static courseName = '';
  static courseID = '';


  private user: User = null;
  private permission: Permission = null;


  constructor(
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    public toastController: ToastController,
  ) { }

  getCourseName() {
    // console.log(VarServiceService.courseID);
    if (VarServiceService.courseName !== '') {
      return VarServiceService.courseName;
    }
    else {
      return '';
    }
  }
  setCourseName(courseName) {
    VarServiceService.courseName = courseName;
    // console.log(VarServiceService.courseID);
  }
  getCourseID() {
    // console.log(VarServiceService.courseID);
    if (VarServiceService.courseID !== '') {
      return VarServiceService.courseID;
    }
    else {
      return '';
    }
  }
  setCourseID(id) {
    VarServiceService.courseID = id;
    console.log(VarServiceService.courseID);
  }
  getUser() {
    if (this.user === null) {
      this.user = this.localStorageService.get('User');
    }
    console.log(this.user);
    return this.user;
  }
  getPermission() {
    if (this.permission === null) {
      this.permission = this.localStorageService.get('Permission');
    }
    console.log(this.user);
    return this.user;
  }
  async presentAlert(messages) {
    const alert = await this.alertController.create({
      animated: true,
      // mode: 'ios',
      message: messages,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(messages) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: messages,
    });
    await toast.present();
  }
}
