import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
})
export class MemberInfoPage implements OnInit {

  member = {
    userId: '13548468846',
    name: 'asfdg',
    totalExperience: 100,
    experience: 98,
    rank: 2,
    phone: '43545674658769895',
    permission: 3,
    birth: '',
    sex: '',
    photo: '',
    school: 'fzu',
    college: 'sj',
    entryYear: '',
    createTime: '',
    token: '',
  };

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onSignInfo() {
    this.router.navigate(['course/sign-info'], { queryParams: { userPhone: this.member.phone } });
  }

}
