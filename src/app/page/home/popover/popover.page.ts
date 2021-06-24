import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  template: '<ion-item (click)="creatCourse()" >\n' +
    '创建课程' +
    '</ion-item>\n' +
    '<ion-item (click)="presentAlertPrompt()" >\n' +
    '课程号查找课程' +
    '</ion-item>' +
    '<ion-item (click)="doBarCodeScanner()" >\n' +
    '二维码查找课程' +
    '</ion-item>'
})
export class PopoverPage implements OnInit {
  id: number;
  courseNumber: number;
  constructor(
    private alertCtrl: AlertController, private navParams: NavParams,
    private toastCtrl: ToastController,
    private navCtrl: NavController, private popoverCtrl: PopoverController,
    private router: Router,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private barcodeScanner: BarcodeScanner,
  ) {
  }
  ngOnInit() {
    // this.router.dispose()
  }
  async creatCourse() {
    if (this.varServiceService.getUser().roleName !== '学生') {
      console.log('creatCourse');
      this.router.navigateByUrl('/course/create-course');
      this.popoverCtrl.dismiss();
    }
    else {
      this.varServiceService.presentToast('权限不够!');
    }

  }
  searchCourseByNumber() {
    // console.log('searchCourseByNumber');
    // this.presentAlertPrompt();
    // if (this.courseNumber % 10000000 === 19) {
    //   this.varServiceService.presentAlert('已加入该班课');
    // }
    // else if (this.courseNumber % 10000000 > 100) {
    //   this.varServiceService.presentAlert('班课不存在');
    // }
    // else if (this.courseNumber % 10000000 === 18) {
    //   this.varServiceService.presentAlert('班课不允许加入');
    // }
    // else if (this.courseNumber % 10000000 === 17) {
    //   this.varServiceService.presentAlert('班课已结束');
    // }
    // else {

    this.router.navigate(['/course/join-course'], { queryParams: { courseNumber: this.courseNumber } });
    // }
    this.popoverCtrl.dismiss();
  }
  searchCourseByBarcode() {
    console.log('searchCourseByBarcode');

    this.popoverCtrl.dismiss();
  }

  async presentAlertPrompt() {
    this.popoverCtrl.dismiss();
    const alert = await this.alertCtrl.create({
      header: '请输入课程号',
      inputs: [
        {
          name: 'courseNumber',
          type: 'number',
          placeholder: '课程号'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (data) => {
            this.courseNumber = data.courseNumber;
            this.searchCourseByNumber();
            console.log('Confirm Ok', this.courseNumber);
          }
        }
      ]
    });
    await alert.present();
  }
  doBarCodeScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      const num = JSON.parse(JSON.stringify(barcodeData)).text;
      // this.varServiceService.presentAlert(num);
      this.courseNumber = num;
      this.searchCourseByNumber();
      //  alert(barcodeData);
    }).catch(err => {
      this.varServiceService.presentAlert(err);
      // alert(err);
    });
  }
}
