import { ActivatedRoute, Router } from '@angular/router';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { NetworkService } from './../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {

  colleges: any = [];
  schools: any = [];

  selectSchoolandCollege = {
    schoolid: '',
    schoolname: '',
    collegeid: '',
    collegename: '',
    collegeschoolId: '',
  };

  isCollegeShow = false;

  fromUrl = '/';

  constructor(
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        console.log(queryParams);
        this.fromUrl = queryParams.fromUrl;
      }
    );
    this.showSchool();
  }

  ngOnInit() {
  }

  showCollege(schoolId) {
    // console.log();
    if (schoolId === null) {
      this.varServiceService.presentToast('请先选择学校');
    }
    else {
      this.networkService.getCollege(schoolId).then(async (result: any) => {
        if (result.code === 200) {
          this.colleges = result.data;
        }
        else {
          this.varServiceService.presentToast('获取学院失败!');
        }
      });
    }
  }
  showSchool() {
    // console.log();
    this.networkService.getSchool().then(async (result: any) => {
      if (result.code === 200) {
        this.schools = result.data;
      }
      else {
        this.varServiceService.presentToast('获取学校失败!');
      }
    });
  }

  onSelectCollege(school) {
    this.selectSchoolandCollege.schoolid = school.id;
    this.selectSchoolandCollege.schoolname = school.name;
    this.showCollege(school.id);
    this.isCollegeShow = true;
    console.log(this.selectSchoolandCollege);
    console.log(this.isCollegeShow);
  }
  onSelectSchool() {
    this.isCollegeShow = false;
    console.log(this.isCollegeShow);
  }
  onSelectEnd(college) {
    this.selectSchoolandCollege.collegeid = college.id;
    this.selectSchoolandCollege.collegename = college.name;
    this.selectSchoolandCollege.collegeschoolId = college.schoolId;
    console.log(this.selectSchoolandCollege);
    console.log(this.isCollegeShow);
    this.router.navigate([this.fromUrl], { queryParams: this.selectSchoolandCollege });
  }

}
