import { User } from './../class/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  rooturl = 'http://120.79.182.99/daoyun';
  constructor(private http: HttpClient) { }

  post(url: string, param: any = null){
    const posturl = this.rooturl + url;
    return new Promise((reslove, reject) => {
      this.http.post(posturl, {}, {params: param}).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  get(url: string, param: any = null){
    const posturl = this.rooturl + url;
    return new Promise((reslove, reject) => {
      this.http.get(posturl, {params: param}).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  login(phone: string, password: string) {
    const param = {
      'phone': phone,
      'password': password,
    };
    return this.post('/user/login', param);
  }
  signup(signup: any){
    return this.post('/user/register', signup);
  }
  getverifyCode(phone: string){
    const param = {
      'phone': phone,
    };
    return this.post('/msg/send', param);
  }
  getSchool(){
    return this.post('/org/school/all');
  }
  getCollege(schoolId){
    const param = {
      'schoolId': schoolId,
    };
    return this.get('/org/college/all', param);
  }
}

