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
  courses = [];
  createCourses = [];
  joinCourses = [];
  permission: Permission;
  isJoin = true;
  isStudent = true;
  createdCode: string;
  createCoursestotal = 0;
  joinCoursestotal = 0;

  constructor(
    private router: Router,
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private actionSheetController: ActionSheetController,
    private localStorageService: LocalStorageService,
    public popoverCtrl: PopoverController
  ) {
    this.getJoinCourses();
    // this.courses = this.joinCourses;
    if (this.varServiceService.getUser().permission > 1) {
      this.isStudent = false;
    }
  }

  ngOnInit() {
    this.getJoinCourses();
    // this.courses = this.joinCourses;
    if (this.varServiceService.getUser().permission > 1) {
      this.isStudent = false;
    }
    // if (this.isJoin) {
    //   this.refreshJoinCourse();
    //   this.courses = this.joinCourses;
    // }
    // else {
    //   this.refreshCreateCourse();
    //   this.courses = this.createCourses;
    // }
    // this.courses = this.joinCourses;
    // console.log('ngOnInit');
    // console.log(this.courses);
  }

  onSegChange(event) {
    //  event => {
    console.log(event.detail.value);
    if (event.detail.value === 'join') {
      this.getJoinCourses();
      // console.log(this.joinCourses, this.courses);
      this.isJoin = true;
      VarServiceService.isJoin = true;
    }
    else {
      this.getCreateCourses();
      // console.log(this.createCourses, this.courses);
      this.isJoin = false;
      VarServiceService.isJoin = false;
    }
    //  }
  }

  toCourse(course) {
    console.log('toCourse ');
    console.log(course);
    this.varServiceService.setCourseName(course.name);
    this.varServiceService.setCourseID(course.id);
    // if(course.te)
    VarServiceService.course = course;
    //  console.log(VarServiceService.courseName);
    this.router.navigate(['course'], { queryParams: { join: this.isJoin } });
    // this.router.navigateByUrl('course');
  }

  getJoinCourses() {
    console.log('getJoinCourses');
    if (this.joinCourses.length === 0) {
      this.networkService.getJoinCourses(this.varServiceService.getUser().token).then(async (result: any) => {
        if (result.code === 200) {
          //  this.presentAlert(result.msg);
          //  this.router.navigateByUrl('passport/login');
          this.joinCourses = result.data;
          this.courses = this.joinCourses;
          this.joinCoursestotal = this.joinCourses.length;
          // console.log(this.joinCourses);
          // this.varServiceService.presentToast('加载成功');
        }
        else {
          this.varServiceService.presentToast(result.msg);
          this.router.navigateByUrl('passport/login');
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
    else {
      this.courses = this.joinCourses;
    }
  }

  getCreateCourses() {
    console.log('getCreateCourses');
    if (this.createCourses.length === 0) {
      console.log('getCreateCourses');
      this.networkService.getCreateCourses(this.varServiceService.getUser().token).then(async (result: any) => {
        if (result.code === 200) {
          //  this.presentAlert(result.msg);
          //  this.router.navigateByUrl('passport/login');
          this.createCourses = result.data;
          // this.createCourses.sort(this.sortCourse);
          this.courses = this.createCourses;
          this.createCoursestotal = this.joinCourses.length;
          console.log(this.createCourses);
          // this.varServiceService.presentToast('加载成功');
        }
        else {
          this.varServiceService.presentToast(result.msg);
          // this.presentAlert(result.msg);
          // console.log(result);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
    else {
      this.courses = this.createCourses;
    }
  }
  sortCourse(b, a) {
    return a.courseNumber.valueOf() - b.courseNumber.valueOf();
  }
  onSign(course) {
    let runSign = [];
    console.log('onSign');
    this.networkService.getCourseRunSign(course.id, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        console.log(result);
        runSign = result.data;
        console.log(runSign);
        if (!this.isJoin) {
          // console.log(courseId);
          this.varServiceService.setCourseName(course.name);
          this.varServiceService.setCourseID(course.id);
          // if（course
          VarServiceService.course = course;
          if (runSign.length > 0) {
            VarServiceService.startSign = true;
          }
          else {
            VarServiceService.startSign = false;
          }
          console.log(VarServiceService.startSign);
          this.router.navigateByUrl('sign');
        }
        else {
          if (runSign.length > 0) {
            this.varServiceService.setCourseName(course.name);
            this.varServiceService.setCourseID(course.id);
            VarServiceService.course = course;
            if (runSign[0].parameter.name === '手势签到') {
              this.router.navigateByUrl('sign/gesture');
            }
            else {
              this.router.navigateByUrl('sign/sign-in');
            }
            // console.log(courseId);
            // this.varServiceService.setCourseName(courseId);
            // this.varServiceService.setCourseID(courseId);
            // this.router.navigateByUrl('sign');
          }
          else {
            this.varServiceService.presentToast('还没有开始签到!');
            return;
          }
        }
      }
      else {
        this.varServiceService.presentToast(result.code + result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }

  refreshCreateCourse() {
    // this.joinCourses = [];
    this.createCourses = [];
    this.getCreateCourses();
    // console.log(this.createCourses, this.courses);
    this.isJoin = false;
    VarServiceService.isJoin = false;
  }
  refreshJoinCourse() {
    this.joinCourses = [];
    // this.createCourses = [];
    this.getJoinCourses();
    this.isJoin = true;
    VarServiceService.isJoin = true;
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

  refreshData(event) {
    if (this.isJoin) {
      new Promise((resolve, reject) => {
        console.log('refreshData', 'join');
        this.refreshJoinCourse();
        resolve('succeed');
        reject('failure');
      }).then(() => {
        event.target.complete();
      });
    }
    else {
      new Promise((resolve, reject) => {
        console.log('refreshData', 'create');
        // this.joinCourses = [];
        this.refreshCreateCourse();
        resolve('succeed');
        reject('failure');
      }).then(() => {
        event.target.complete();
      });
    }
  }

}
