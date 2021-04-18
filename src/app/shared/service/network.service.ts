import { User } from './../class/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  rooturl = 'http://120.79.182.99/daoyun';
  constructor(private http: HttpClient) { }

  post(url: string, param: any = null, header: any = null) {
    const posturl = this.rooturl + url;
    console.log(param);
    console.log(header);
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
    console.log(param);
    console.log(header);
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
  getSignofCourse(cid, uid, usertoken) {
    const header = {
      token: usertoken,
    };
    const param = {
      courseId: cid,
      userId: uid
    };
    return this.post('/sign/info/student', param, header);
  }
}

