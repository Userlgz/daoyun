import { User } from './../class/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  url = 'http://120.79.182.99/daoyun';
  constructor(private http: HttpClient) { }

  login(phone: string, password: string) {
    const loginurl = this.url + '/user/login' + '?phone=' + phone + '&password=' + password;
    console.log('net-login' + loginurl);
    // this.http.get('http://ionic.io', {}, {})
    //   .then(data => {

    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     console.log(data.headers);

    //   })
    //   .catch(error => {

    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);

    //   });
    return new Promise((reslove, reject) => {
      this.http.post(loginurl, {}).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
    // this.http.post('https://jsonplaceholder.typicode.com/todos',
    // {
    //   userId: 1, title: 'learn ionic 4', completed: false
    // }, {})
  }
}

