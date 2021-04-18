import { VarServiceService } from './../../../shared/service/var-service.service';
import { NetworkService } from './../../../shared/service/network.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-sign-info',
  templateUrl: './sign-info.page.html',
  styleUrls: ['./sign-info.page.scss'],
})
export class SignInfoPage implements OnInit {

  userId = 132456;
  signInfo = null;
  // [
  //   {
  //     beginTime: '2020-03-21',
  //     status: 1,
  //     experience: 2
  //   },
  //   {
  //     beginTime: '2020-03-21',
  //     status: 0,
  //     experience: 2
  //   },
  // ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
  ) {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.userId = queryParams.userId;
        this.getSign();
        console.log(this.userId);
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.userId = queryParams.userId;
        this.getSign();
        console.log(this.userId);
      }
    );
  }
  getSign() {
    this.networkService.getSignofUser(VarServiceService.courseID, this.userId,
      this.varServiceService.getUser().token).then(async (result: any) => {
        console.log(result);
        if (result.code === 200) {
          this.signInfo = result.data;
        }
      });
  }
}
