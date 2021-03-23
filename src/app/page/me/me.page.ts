import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {

  constructor(private router: Router) { }
  public appPages = [
    { title: '开店论坛', url: '/tabs/home', icon: 'chatbox' },
    { title: '手机橱窗', url: '/tabs/home', icon: 'create' },
    { title: '邀请有礼', url: '/tabs/home', icon: 'git-merge' },
    { title: '资金账户', url: '/tabs/home', icon: 'cash' },
    { title: '反馈建议', url: '/tabs/home', icon: 'cash' },
    { title: '帮助中心', url: '/tabs/home', icon: 'cash' },
  ];
  ngOnInit() {
  }
  settings(){
    this.router.navigateByUrl('me/setting');
  }
}
