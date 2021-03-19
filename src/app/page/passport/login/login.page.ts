import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    username = '';
    password = '';

    constructor(private router: Router) { }

    ngOnInit() {
    }

    // 点击登录按钮时调用
    async onLogin(form: NgForm) {
        // 账号为空时提示输入账号
        if (this.username !== '' && this.password !== '') {
            console.log('login');
            this.router.navigateByUrl('/tabs');
        }
    }
    onSignup(){
        console.log('signup');
    }
    onForgotPassword(){
        console.log('forgotpassword');
    }
}
