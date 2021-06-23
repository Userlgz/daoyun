import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/shared/service/network.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';

@Component({
  selector: 'app-sign-record',
  templateUrl: './sign-record.page.html',
  styleUrls: ['./sign-record.page.scss'],
})
export class SignRecordPage implements OnInit {

  noSignShow = true;
  signedShow = false;
  sign = [];
  noSign = [];
  signed = [];
  signList = [];
  signId = 0;
  constructor(
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.signId = queryParams.signid;
        this.getSignStu(this.signId);
      }
    );
  }

  ngOnInit() {
  }
  getSignStu(signId) {
    console.log('getSignStu', signId);

    this.networkService.getSignStuById(signId, this.varServiceService.getUser().token).then(async (stu: any) => {
      if (stu.code === 200) {
        this.sign = stu.data;
        console.log(this.sign);
        this.signed = [];
        this.noSign = [];
        for (const s of this.sign) {
          if (s.status === '已签到') {
            this.signed.push(s);
          }
          else {
            this.noSign.push(s);
          }
        }
      }
      else {
        this.varServiceService.presentToast(stu.code + stu.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
      console.log(error);
      return;
    });
    // this.router.navigateByUrl('sign/signing');

  }
  changeNoSignShow() {
    this.noSignShow = !this.noSignShow;
  }
  changeSignedShow() {
    this.signedShow = !this.signedShow;
  }
  onManual(item) {
    console.log('补签');
    this.networkService.makeSign(this.signId, item.id, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.varServiceService.presentToast(item.name + ' 补签成功');
        this.getSignStu(this.signId);
      }
      else {
        this.varServiceService.presentToast(result.code + result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
      console.log(error);
      return;
    });
  }
}
