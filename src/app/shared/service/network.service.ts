import { User } from './../class/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  rooturl = 'http://120.79.182.99/daoyun';
  constructor(
    private http: HttpClient,
    private httpt: HTTP
  ) { }

  post(url: string, param: any = null, header: any = null) {
    const posturl = this.rooturl + url;
    // console.log(param);
    // console.log(header);
    return new Promise((reslove, reject) => {
      this.http.post(posturl, {}, { headers: header, params: param }).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  get(url: string, param: any = null, header: any = null) {
    const posturl = this.rooturl + url;
    // console.log(param);
    // console.log(header);
    return new Promise((reslove, reject) => {
      this.http.get(posturl, { headers: header, params: param }).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  login(userphone: string, userpassword: string) {
    const param = {
      phone: userphone,
      password: userpassword,
    };
    return this.post('/user/login', param);
  }
  loginByCode(userphone: string, ucode) {
    const param = {
      phone: userphone,
      code: ucode,
    };
    return this.post('/user/login/code', param);
  }
  loginByGithub() {
    /*
    https://github.com/login/oauth/authorize?client_id=4ad78bed988e37c07544&state=STATE&redirect_uri=http://120.79.182.99:80/daoyun/callback/git
    */
    const param = {
      client_id: '4ad78bed988e37c07544',
      state: 'STATE',
      redirect_uri: 'http://120.79.182.99:80/daoyun/callback/git'
    };
    const header = {
      'Access-Control-Allow-Origin': '*',

    };
    // return new Promise((reslove, reject) => {
    //   this.http.get('https://github.com/login/oauth/authorize', { headers: header, params: param }).subscribe((response) => {
    //     reslove(response);
    //   }, (error) => {
    //     reject(error);
    //   });
    // });
    return this.get('/login/oauth/authorize', param, header);
    // return this.httpt.get('https://github.com/login/oauth/authorize', param, null);
  }
  login__() {
    return new Promise((reslove, reject) => {
      this.http.get('http://ionic.io', {}).subscribe((response) => {
        reslove(response);
      }, (error) => {
        reject(error);
      });
    });
  }
  signup(signup: any) {
    return this.post('/user/register', signup);
  }
  createCourse(course: any, usertoken) {
    const header = {
      token: usertoken,
    };
    return this.post('/course/add', course, header);
  }
  getJoinCourses(usertoken) {
    const header = {
      token: usertoken,
    };
    return this.get('/course/all/sid', null, header);
  }
  getCreateCourses(usertoken) {
    const header = {
      token: usertoken,
    };
    return this.get('/course/all/tid', null, header);
  }
  getCoursesByCourseNumber(searchCourseNumber, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseNumber: searchCourseNumber,
    };
    return this.get('/course/get/one', param, header);
  }
  joinCourse(id, searchCourseNumber, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      userId: id,
      courseNumber: searchCourseNumber,
    };
    return this.post('/course/join', param, header);
  }
  getverifyCode(userphone: string, codetype: string) {
    const param = {
      phone: userphone,
      type: codetype,
    };
    return this.post('/msg/send', param);
  }
  getSchool() {
    return this.post('/org/school/all');
  }
  getCollege(userschoolId) {
    const param = {
      schoolId: userschoolId,
    };
    return this.get('/org/college/all', param);
  }

  getCoursesMembers(courseID, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: courseID,
    };
    return this.get('/course/student/all', param, header);
  }
  getSignofUser(cid, uid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: cid,
      userId: uid
    };
    return this.post('/sign/info/student', param, header);
  }
  getSignofCourse(cid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: cid,
    };
    return this.post('/sign/get/course', param, header);
  }
  getSignStuById(sid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      signId: sid,
    };
    return this.get('/sign/get/student', param, header);
  }
  updateUserInfo(userInfo, usertoken) {
    const header = {
      token: usertoken,
    };
    return this.post('/user/info/change', userInfo, header);
  }
  updatePassword(oldp, newp, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      oldPsw: oldp,
      newPsw: newp
    };
    return this.post('/user/psw/change', param, header);
  }
  createSign(type, sign, usertoken) {
    const header = {
      token: usertoken,
    };
    return this.post('/sign/' + type, sign, header);
  }
  searchSigning(courseid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: courseid,
    };
    return this.post('/sign/get/running', param, header);
  }
  getCourseRunSign(cid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: cid,
    };
    return this.post('/sign/get/running', param, header);
  }
  joinSign(sign, usertoken) {
    const header = {
      token: usertoken,
    };
    return this.post('/sign/join', sign, header);
  }
  endSign(sid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      signId: sid,
    };
    return this.post('/sign/finish', param, header);
  }
}

