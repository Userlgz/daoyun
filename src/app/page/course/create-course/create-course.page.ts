import { NetworkService } from './../../../shared/service/network.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { PickerService } from 'src/app/shared/service/picker.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.page.html',
  styleUrls: ['./create-course.page.scss'],
})
export class CreateCoursePage implements OnInit {
  detail = false;
  course = {
    teacherId: null,
    name: null,
    term: null,
    testArrange: '无',
    courseNumber: null,
    school: null,
    college: null,
    classNumber: null,
    teachArrange: '无',
    join: true,
    finish: false
  };


  termOptions = [
    ['2020-2021', '2021-2022', '2022-2023'],
    ['1', '2']
  ];
  public termText = '学期'; // 选择的学科

  constructor(
    private activatedRoute: ActivatedRoute,
    public pickercontroller: PickerController,
    public pickerService: PickerService,
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.course.school = queryParams.schoolname;
        this.course.college = queryParams.collegename;
        console.log(this.course);
      }
    );
  }

  onDetail() {
    this.detail = !this.detail;
    console.log(this.detail);
  }

  pickerFn($start, $length, $option, type) {
    const that = this;
    const selectIdx = [];
    const myDate = new Date();
    const year = myDate.getFullYear();
    let mouth = myDate.getMonth();
    console.log(year, mouth);
    if (mouth < 6){
      mouth = 1;
    }
    else{
      mouth = 0;
    }
    selectIdx.push(year - 2020 - mouth);
    selectIdx.push(mouth);
    console.log(selectIdx);
    this.pickerService.openPicker($start, $length, $option, [1, 0], (result) => {
      const vals = JSON.parse(result)['col-0'].text + '-' + JSON.parse(result)['col-1'].text;
      // that.termText = vals;
      that.course.term = vals;
      // console.log(that.termText);
    });
  }
  onSubmission() {
    this.course.teacherId = this.varServiceService.getUser().id;
    if (this.course.name === null) {
      this.varServiceService.presentToast('请填写课程名称');
    }
    else if (this.course.classNumber === null) {
      this.varServiceService.presentToast('请填写班级');
    }
    else if (this.course.school === null || this.course.college === null) {
      this.varServiceService.presentToast('请填写学校学院');
    }
    else if (this.course.term === null) {
      this.varServiceService.presentToast('请填写学期');
    }
    else {
      this.networkService.createCourse(this.course, this.varServiceService.getUser().token).then(async (result: any) => {
        // console.log(this.course);
        if (result.code === 200) {
          this.varServiceService.presentToast('创建课程成功');
          this.course = result.data;
          VarServiceService.course = this.course;
          this.router.navigateByUrl('course/course-info');
        }
        else {
          this.varServiceService.presentAlert(result.code + result.msg);
        }
      }).catch((error) => {
        this.varServiceService.presentToast('网络出错');
      });
    }
  }
}
