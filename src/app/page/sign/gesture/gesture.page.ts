import { NetworkService } from './../../../shared/service/network.service';
import { VarServiceService } from 'src/app/shared/service/var-service.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { Component, OnInit } from '@angular/core';
import PatternLock from 'patternlock';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.page.html',
  styleUrls: ['./gesture.page.scss'],
})
export class GesturePage implements OnInit, OnChanges {

  R = 30; canvasWidth = 400; canvasHeight = 320; OffsetX = 22; OffsetY = 22;
  angleRange = 0;
  xSpace = 0;
  ySpace = 0;
  canvas: any;
  context: any;
  circleArr = [];
  // @Input()
  currheight: number;  //  此高度为 canvas距离顶部的高度
  @Input()
  color = 'primary';  //  主题颜色,此处为拓展项，以后添加
  @Input()
  clear = '';
  gesPass = '';
  drawend = false;
  startDraw = false;
  /**
   * 计算选中的密码
   */
  ii = 0;
  longitude = 0;
  latitude = 0;
  join = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private varServiceService: VarServiceService,
    private networkService: NetworkService,
    private router: Router,
  ) {
    // this.canvas = document.getElementById('lockCanvass');
    // this.canvasWidth = document.body.offsetWidth;  //  网页可见区域宽
    // this.canvas = document.getElementById('lockCanvass');
    // this.currheight = this.getTop(this.canvas);
    // this.currheight = document.getElementById('lockCanvass').offsetTop;
    //
    this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.longitude = queryParams.longitude;
        this.latitude = queryParams.latitude;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  getTop(e) {
    let offset = e.offsetTop;
    if (e.offsetParent != null) {
      offset += this.getTop(e.offsetParent);
    }
    return offset;
  }
  ngOnInit() {
    this.canvas = document.getElementById('lockCanvass');
    // this.currheight = this.getTop(this.canvas);

    this.canvasWidth = document.body.offsetWidth;  //  网页可见区域宽

    this.OffsetX = this.canvasWidth * 0.15;
    this.OffsetY = this.canvasWidth * 0.15;
    this.R = this.canvasWidth * 0.075;
    this.canvasHeight = this.canvasWidth;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasWidth;
    const cxt = this.canvas.getContext('2d');
    //  /**
    //  *  每行3个圆
    //  *  OffsetX为canvas x方向内边距
    //  *
    //  **/

    this.xSpace = (this.canvasWidth - 2 * this.OffsetX - this.R * 2 * 3) / 2;
    this.ySpace = (this.canvasHeight - 2 * this.OffsetY - this.R * 2 * 3) / 2;
    this.angleRange = Math.asin(this.R / (4 * this.R + 2 * this.xSpace)) / Math.PI * 180;

    console.log('param: offsetWidth: ', document.body.offsetWidth, ' R: ', this.R, ' width: ', this.canvas.width, ' OffsetY: ',
      this.OffsetY, ' xSpace: ', this.xSpace, ' angleRange: ', this.angleRange);

    this.createCirclePoint(this.xSpace, this.ySpace);
    this.bindEvent(this.canvas, cxt);
    //  CW=2*offsetX+R*2*3+2*X
    this.Draw(cxt, this.circleArr, [], null);
    this.currheight = document.getElementById('lockCanvass').offsetTop;

  }
  onClick(event) {
  }

  createCirclePoint(diffX, diffY) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        //  计算圆心坐标
        const Point = {
          X: (this.OffsetX + col * diffX + (col * 2 + 1) * this.R),
          Y: (this.OffsetY + row * diffY + (row * 2 + 1) * this.R)
        };
        this.circleArr.push(Point);
      }
    }


  }

  distanceOfPoint2Line(x, y, x1, y1, x2, y2) {

    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) { // 线段长度不能为0
      param = dot / lenSq;
    }
    else {
      return this.R + 100;
    }
    let xx;
    let yy;

    if (param > 1) {
      xx = x2;
      yy = y2;
    }
    else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getAngle(x1, y1, x2, y2) {
    const dot = x1 * x2 + y1 * y2;
    const det = x1 * y2 - y1 * x2;
    const angle = Math.atan2(det, dot) / Math.PI * 180;
    // return (angle + 360) % 180;
    return Math.abs(angle);
  }

  public getSelectPwd(touches, pwdArr, rect) {
    if (this.startDraw && pwdArr.length > 0) {
      let ind: any;
      const lastPointIndex = pwdArr[pwdArr.length - 1];
      const lastPoint = this.circleArr[lastPointIndex];
      const R2 = this.R + 1;
      // console.log(lastPointIndex);
      const X = touches.clientX > this.canvasWidth ? this.canvasWidth : touches.clientX;
      //       // 此处应加上 九宫格解锁的实际高度   解决BUG
      const Y = (touches.clientY - rect.top) > this.canvasHeight ? this.canvasHeight : (touches.clientY - rect.top);
      this.ii += 1;
      for (let i = 0; i < this.circleArr.length; i++) {
        const currentPoint = this.circleArr[i];
        const xdiff = Math.abs(currentPoint.X - X);
        const ydiff = Math.abs(currentPoint.Y - Y);
        const xcldiff = Math.abs(currentPoint.X - lastPoint.X);
        const ycldiff = Math.abs(currentPoint.Y - lastPoint.Y);
        const xtldiff = Math.abs(X - lastPoint.X);
        const ytldiff = Math.abs(Y - lastPoint.Y);
        const diff = Math.abs(xdiff - ydiff);
        const dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
        const cldir = Math.pow((xcldiff * xcldiff + ycldiff * ycldiff), 0.5);
        // const dir2 = this.distanceOfPoint2Line(currentPoint.X, currentPoint.Y,
        //   lastPoint.X, lastPoint.Y, touches.clientX, (touches.clientY + rect.top));
        const angle = this.getAngle(X - lastPoint.X, Y - lastPoint.Y, currentPoint.X - lastPoint.X, currentPoint.Y - lastPoint.Y);
        // console.log('angle: ', angle);
        // if (this.ii % 100 === 0) {
        //   console.log('angle', lastPointIndex, i, angle);
        // }

        const dircl = Math.pow((xcldiff * xcldiff + ycldiff * ycldiff), 0.5);
        const dirtl = Math.pow((xtldiff * xtldiff + ytldiff * ytldiff), 0.5);
        if (
          pwdArr.indexOf(i) < 0 &&
          (
            (dir < this.R)
            // (angle < 5 && dirtl > dircl) // ||
            // (dirtl > dircl && Y >= currentPoint.Y)
            // (
            || (xdiff < this.R || ydiff < this.R || diff < this.R)
            && (dirtl > dircl)
            && (angle < this.angleRange)

            // )
            // (ytldiff < R2 && dirtl > dircl) ||
            // (diff < R2 && dirtl > dircl && angle > 160)
          )
        ) {
          // console.log(xdiff, ydiff, dir, dircl, dirtl, angle);
          if ((i + lastPointIndex) % 2 === 0 && cldir > 1.8 * (this.xSpace + 2 * this.R)) {
            ind = (i + lastPointIndex) / 2;
            if (pwdArr.indexOf(ind) < 0) {
              pwdArr.push(ind);
            }

          }
          pwdArr.push(i);
          break;
        }
      }
    }
  }

  public startgetSelectPwd(touches, pwdArr, rect) {
    for (let i = 0; i < this.circleArr.length; i++) {
      const currentPoint = this.circleArr[i];
      const xdiff = Math.abs(currentPoint.X - touches.clientX);
      //       // 此处应加上 九宫格解锁的实际高度   解决BUG
      const ydiff = Math.abs(currentPoint.Y - touches.clientY + rect.top);

      const dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
      if (dir > this.R || pwdArr.indexOf(i) >= 0) {
        continue;
      }
      pwdArr.push(i);
      this.startDraw = true;
      break;
    }
  }

  private Draw(cxt, circleArr, pwdArr, touchPoint) {
    if (pwdArr.length > 0) {
      cxt.beginPath();
      for (let i = 0; i < pwdArr.length; i++) {
        const pointIndex = pwdArr[i];
        cxt.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
      }
      cxt.lineWidth = 10;
      cxt.strokeStyle = '#5b98fb';
      //  cxt.strokeStyle = '#00ffdd';
      cxt.stroke();
      cxt.closePath();

      if (touchPoint != null) {
        const lastPointIndex = pwdArr[pwdArr.length - 1];
        const lastPoint = circleArr[lastPointIndex];
        cxt.beginPath();

        // 划线的高度处理
        cxt.moveTo(lastPoint.X, lastPoint.Y);
        cxt.lineTo(touchPoint.X, touchPoint.Y);
        cxt.stroke();
        cxt.closePath();
      }
    }
    for (let i = 0; i < circleArr.length; i++) {
      const Point = circleArr[i];
      cxt.fillStyle = '#5b98fb';
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      cxt.fillStyle = '#ffffff';
      cxt.beginPath();
      cxt.arc(Point.X, Point.Y, this.R - 3, 0, Math.PI * 2, true);
      cxt.closePath();
      cxt.fill();
      if (pwdArr.indexOf(i) >= 0) {
        cxt.fillStyle = '#5b98fb';
        cxt.beginPath();
        cxt.arc(Point.X, Point.Y, this.R - 16, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fill();
      }

    }


  }

  /**
   * 给画布绑定事件
   */
  private bindEvent(canvas, cxt) {

    const signThis = this;
    let pwdArr = [];
    canvas.addEventListener('touchstart', function ts(e) {
      if (signThis.drawend) {
        canvas.removeEventListener('touchstart', ts);
        console.log('removeEventListener touchstart');
      }
      else {
        const rect = e.currentTarget.getBoundingClientRect();
        signThis.startgetSelectPwd(e.touches[0], pwdArr, rect);
      }

    }, (error) => {

    });
    canvas.addEventListener('touchmove', function tm(e) {
      if (signThis.drawend) {
        canvas.removeEventListener('touchmove', tm);
        console.log('removeEventListener touchmove');
      }
      else {
        const rect = e.currentTarget.getBoundingClientRect();
        e.preventDefault();
        const touches = e.touches[0];
        signThis.getSelectPwd(touches, pwdArr, rect);
        cxt.clearRect(0, 0, signThis.canvasWidth, signThis.canvasHeight);
        // 此处应减去  九宫格解锁的实际高度
        signThis.Draw(cxt, signThis.circleArr, pwdArr, { X: touches.clientX, Y: touches.clientY - rect.top });
        // 阻止事件冒泡   2018-04-03 ionic 碰到 右滑返回上一页面 BUG
        const oEvent = e;
        oEvent.cancelBubble = true;
        oEvent.stopPropagation();
      }

    }, false);
    canvas.addEventListener('touchend', function te(e) {
      //  const touches = e.touches[0];
      signThis.startDraw = false;
      if (signThis.drawend) {
        canvas.removeEventListener('touchend', te);
        console.log('removeEventListener touchend');
      }
      if (pwdArr.length >= 4) {
        signThis.drawend = true;

        canvas.removeEventListener('touchend', te);
        console.log('removeEventListener touchend');
        cxt.clearRect(0, 0, signThis.canvasWidth, signThis.canvasHeight);
        signThis.Draw(cxt, signThis.circleArr, pwdArr, null);
        for (const i of pwdArr) {
          signThis.gesPass += String(i + 1);
        }
      }
      else {
        // signThis.startDraw = false;
        cxt.clearRect(0, 0, signThis.canvasWidth, signThis.canvasHeight);
        signThis.Draw(cxt, signThis.circleArr, [], { X: 0, Y: 0 });
        signThis.gesPass = '';
        pwdArr = [];
      }
      console.log(pwdArr);
      console.log(signThis.gesPass);
    }, false);
    //
    //
  }
  reset() {
    this.drawend = false;
    this.startDraw = false;
    this.gesPass = '';
    const cxt = this.canvas.getContext('2d');
    // this.createCirclePoint(this.xSpace, this.ySpace);
    this.bindEvent(this.canvas, cxt);
    //  CW=2*offsetX+R*2*3+2*X
    cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.Draw(cxt, this.circleArr, [], null);
  }
  submit() {
    if (this.gesPass === '') {
      this.varServiceService.presentAlert('请绘制手势密码！');
    }
    else {
      const sign = {
        courseId: this.varServiceService.getCourseID(),
        isFinish: 0,
        longitude: this.longitude,
        latitude: this.latitude,
        passport: this.gesPass
      };
      // this.sign.courseId = this.varServiceService.getCourseID();
      if (!VarServiceService.startSign) {
        this.networkService.createSign('hand', sign, this.varServiceService.getUser().token).then(async (result: any) => {
          if (result.code === 200) {
            this.varServiceService.presentAlert('请提醒学生开始签到！');
            console.log(result);
            this.router.navigateByUrl('sign/signing');
          }
          else {
            this.varServiceService.presentToast(result.code + result.msg);
          }
        }).catch((error) => {
          this.varServiceService.presentToast('网络出错');
        });
      }
      else {
        this.varServiceService.presentAlert('您还有未结束的签到');
        this.router.navigateByUrl('sign/signing');
      }
    }
  }

}
