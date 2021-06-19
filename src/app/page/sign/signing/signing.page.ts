import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/shared/service/network.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.page.html',
  styleUrls: ['./signing.page.scss'],
})
export class SigningPage implements OnInit {
  sign = [];
  noSign = [];
  signed = [];
  signList = [
    {
      id: -1,
      beginTime: '--/--',
      endTime: '--/--',
    }
  ];
  refreshTime = {
    tips: '刷新',
    countdown: 10,
    disable: false,
  };
  constructor(
    private networkService: NetworkService,
    private varServiceService: VarServiceService,
    private router: Router,
  ) {
    // this.getSignStu();
  }
  ngOnInit() {
    this.getSignStu();
  }
  getSignStu() {
    console.log('getSignStu');
    this.networkService.searchSigning(VarServiceService.courseID, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.signList = result.data;
        console.log(result);
        console.log(this.signList);
        console.log(this.signList.length);
        if (this.signList.length === 0) {
          this.varServiceService.presentToast('还没有开始签到!');
          return;
        }
        const end = new Date(this.signList[0].endTime.replace(/-/g, '/')); // 结束时间
        const curr = new Date().getTime();
        const diff = end.getTime() - curr;
        console.log('getSignStu diff', diff);
        if (diff > 0) {
          setTimeout(() => {
            this.endSign();
            this.varServiceService.presentAlert('签到结束!');
          }, diff);
        }
        else {
          this.endSign();
        }
        this.refresh();
        this.settime();
        // this.router.navigateByUrl('sign/signing');
      }
      else {
        this.varServiceService.presentToast(result.code + result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
    });
  }
  giveUpSign() {
    console.log('giveUpSign');
  }
  endSign() {
    if (this.signList.length === 0) {
      this.varServiceService.presentToast('还没有开始签到!');
      return;
    }
    this.networkService.endSign(this.signList[0].id, this.varServiceService.getUser().token).then(async (result: any) => {
      if (result.code === 200) {
        this.varServiceService.presentToast(result.msg);
        if (this.signList.length === 1) {
          VarServiceService.startSign = false;
        }
        this.refreshTime.disable = true;
        this.router.navigateByUrl('sign');
      }
      else {
        this.varServiceService.presentToast(result.code + result.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
      return;
    });
    console.log('endSign');
  }
  refresh() {
    if (this.signList.length === 0) {
      this.varServiceService.presentToast('还没有开始签到!');
      return;
    }
    this.networkService.getSignStuById(this.signList[0].id, this.varServiceService.getUser().token).then(async (stu: any) => {
      if (stu.code === 200) {
        this.sign = stu.data;
        // console.log(this.sign);
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
        // console.log(this.signed.length, this.noSign.length);
      }
      else {
        this.varServiceService.presentToast(stu.code + stu.msg);
      }
    }).catch((error) => {
      this.varServiceService.presentToast('网络出错');
      return;
    });
  }
  settime() {
    if (this.refreshTime.disable) {
      return;
    }
    if (this.refreshTime.countdown === 0) {
      this.refreshTime.countdown = 10;
      this.refresh();
      // return;
    } else {
      this.refreshTime.countdown--;
    }
    this.refreshTime.tips = '刷新(' + this.refreshTime.countdown + ')';
    setTimeout(() => {
      this.refreshTime.tips = '刷新(' + this.refreshTime.countdown + ')';
      this.settime();
    }, 1000);
  }
}
