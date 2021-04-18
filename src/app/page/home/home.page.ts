import { PopoverPage } from './popover/popover.page';
import { LocalStorageService } from './../../shared/service/local-storage.service';
import { Permission } from './../../shared/class/permission';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { NetworkService } from './../../shared/service/network.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  //  courses = {
  //    teacherId: '',
  //    name: '',
  //    term: '',
  //    testTime: '',
  //    courseNumber: ''
  //  };
  courses = null;
  createCourses = null;
  joinCourses = null;
  permission: Permission;
  isJoin = true;

  constructor(
    private router: Router,
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private actionSheetController: ActionSheetController,
    private localStorageService: LocalStorageService,
    public popoverCtrl: PopoverController
  ) {
    this.getJoinCourses();
  }

  ngOnInit() {
    this.courses = this.joinCourses;
    console.log('constructor');
    console.log(this.courses);
  }

  onSegChange(event) {
    //  event => {
    console.log(event.detail.value);
    if (event.detail.value === 'join') {
      this.getJoinCourses();
      this.isJoin = true;
    }
    else {
      this.getCreateCourses();
      this.isJoin = false;
    }
    //  }
  }
  toCourse(course) {
    console.log('toCourse ');
    console.log(course);
    this.varServiceService.setCourseName(course.name);
    this.varServiceService.setCourseID(course.id);
    //  console.log(VarServiceService.courseName);
    //  this.router.navigate(['course'], { queryParams: { courseName: name } });
    this.router.navigateByUrl('course');
  }

  getJoinCourses() {
    console.log('getJoinCourses');
    // if (this.joinCourses === null) {
    this.networkService.getJoinCourses(this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        //  this.presentAlert(result.msg);
        //  this.router.navigateByUrl('passport/login');
        this.joinCourses = result.data;
        this.courses = this.joinCourses;
        console.log(result);
      }
      else {
        //  this.presentAlert(result.msg);
        console.log(result);
      }
    });
    // }
    // else {
    //   this.courses = this.joinCourses;
    // }
  }

  getCreateCourses() {
    console.log('getCreateCourses');
    // if (this.createCourses === null) {
    this.networkService.getCreateCourses(this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        //  this.presentAlert(result.msg);
        //  this.router.navigateByUrl('passport/login');
        this.createCourses = result.data;
        this.courses = this.createCourses;
        console.log(result);
      }
      else {
        //  this.presentAlert(result.msg);
        console.log(result);
      }
    });
    // }
    // else {
    //   this.courses = this.createCourses;
    // }
  }

  onSign(courseId) {
    console.log(courseId);
    this.router.navigateByUrl('sign');
  }



  async onPresentPopover(e) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: e,
      translucent: false,
      backdropDismiss: true
    });
    await popover.present();
  }

  // async showMenu() {
  //   const actionSheet = await this.actionSheetController.create({
  //     mode: 'ios',
  //     buttons: [{
  //       text: '创建课程',
  //       handler: () => {
  //         //  console.log('创建课程');
  //         this.permission = this.localStorageService.get('permission');
  //         if (this.permission.permission === 1) {
  //           this.router.navigateByUrl('/new-class');
  //         }
  //         else {// 学生无权限
  //           this.varServiceService.presentAlert('学生没有创建权限');
  //         }
  //       }
  //     }, {
  //       text: '取消',
  //       role: 'cancel',
  //       handler: () => {
  //         //  console.log('Cancel clicked');
  //       }
  //     },
  //     {
  //       text: '根据课程号查找课程',
  //       handler: () => {
  //         //  console.log('根据课程号查找课程');
  //         //  this.identity = this.localStorageService.get('identity', null);
  //         //  if (this.identity == 'teacher') {
  //         //    this.presentAlert();
  //         //  }
  //         //  else {
  //         //    this.presentSearchAlert();
  //         //  }
  //       }
  //     }, {
  //       text: '根据二维码查找课程',
  //       handler: () => {
  //         //  console.log('根据二维码查找课程');
  //         //  if (this.identity == 'teacher') {
  //         //    this.presentAlert();
  //         //  }
  //         //  else {
  //         //    this.barcodeScanner.scan().then(barcodeData => {
  //         //      //  alert("Barcode data " + JSON.stringify(barcodeData));
  //         //      //  console.log("Barcode data " + JSON.stringify(barcodeData));
  //         //      this.scannedData = barcodeData;
  //         //      this.course_id = this.scannedData['text'];// 获取扫描到的课程号
  //         //      //  console.log('扫描到的课程号为：', this.course_id);
  //         //      this.router.navigate(['/stu-class-info'], {
  //         //        queryParams: {
  //         //          course_id: this.course_id
  //         //        }
  //         //      });
  //         //    }).catch(err => {
  //         //      //  console.log("Error", err);
  //         //    });
  //         //  }
  //       }
  //     }, {
  //       text: '取消',
  //       role: 'cancel',
  //       handler: () => {
  //         //  console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

}
