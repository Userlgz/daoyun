import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { async } from '@angular/core/testing';
import { NetworkService } from './../../../shared/service/network.service';
import { PassportServiceService } from './../../../shared/service/passport-service.service';
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

  constructor(
    private passportService: PassportServiceService,
    private router: Router,
    private networkService: NetworkService,
    private varServiceService: VarServiceService
  ) { }

  ngOnInit() {
  }
  async onSave() {
    console.log('onSave');
    this.networkService.updatePassword(this.oldpassword, this.newPassword, this.passportService.getUser().token)
      .then(async (result: any) => {
        if (result.code === 200) {
          this.router.navigateByUrl('tabs/me');
        }
        this.varServiceService.presentToast(result.msg);
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
  }
}
