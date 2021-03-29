import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sign-info',
  templateUrl: './sign-info.page.html',
  styleUrls: ['./sign-info.page.scss'],
})
export class SignInfoPage implements OnInit {

  userPhone = 132456;
  signInfo = [
    {
      beginTime: '2020-03-21',
      status: 1,
      experience: 2
    },
    {
      beginTime: '2020-03-21',
      status: 0,
      experience: 2
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.userPhone = queryParams.userPhone;
        console.log(this.userPhone);
      }
    );
  }

}
