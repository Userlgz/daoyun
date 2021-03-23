import { PassportServiceService } from './../../passport/passport-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  viewObject = {
    password: '',
    confirmPassword: '',
  };

  isOldPassword = true;
  oldpassword: string;
  newPassword: string;
  confirmPass: string;

  constructor(private passportService: PassportServiceService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private router: Router) { }

  ngOnInit() {
  }
  async onSave() {
    console.log('onSave');
    const oldPass = this.passportService.getPassword();
    this.isOldPassword = oldPass === this.oldpassword ? true : false;
    if (this.newPassword === this.confirmPass && this.isOldPassword) {
      this.passportService.updatePassword(this.newPassword);
      console.log('修改成功');
      this.router.navigateByUrl('me/setting');
      const toast = await this.toastCtrl.create({
        message: '修改成功',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    }
  }
}
