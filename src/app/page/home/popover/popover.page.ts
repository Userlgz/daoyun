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
    '<ion-item (click)="searchCourseByBarcode()" >\n' +
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
  ) {
  }
  ngOnInit() {
  }
  async creatCourse() {
    console.log('creatCourse');
    this.router.navigateByUrl('/course/create-course');
    this.popoverCtrl.dismiss();
  }
  searchCourseByNumber() {
    console.log('searchCourseByNumber');
    // this.presentAlertPrompt();
    this.router.navigate(['/course/join-course'], { queryParams: {courseNumber: this.courseNumber} });
    this.popoverCtrl.dismiss();
  }
  searchCourseByBarcode() {
    console.log('searchCourseByBarcode');
    this.popoverCtrl.dismiss();
  }

  async presentAlertPrompt() {
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

}
