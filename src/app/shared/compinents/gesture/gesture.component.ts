//  import { Component, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-gesture',
  templateUrl: './gesture.component.html',
  styleUrls: ['./gesture.component.scss'],
})
export class GestureComponent implements OnChanges, OnInit {
  R = 26; canvasWidth = 400; canvasHeight = 320; OffsetX = 22; OffsetY = 22;
  canvas: any;
  context: any;
  circleArr = [];
  @Input()
  currheight: number;  //  此高度为 canvas距离顶部的高度
  @Input()
  color = 'primary';  //  主题颜色,此处为拓展项，以后添加
  @Input()
  clear = '';
  @Output() pwdResult = new EventEmitter<any>();

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.canvas = document.getElementById('lockCanvass');
    this.canvasWidth = document.body.offsetWidth;  //  网页可见区域宽
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    const cxt = this.canvas.getContext('2d');
    //  /**
    //  *  每行3个圆
    //  *  OffsetX为canvas x方向内边距
    //  *
    //  **/

    const X = (this.canvasWidth - 2 * this.OffsetX - this.R * 2 * 3) / 2;
    const Y = (this.canvasHeight - 2 * this.OffsetY - this.R * 2 * 3) / 2;
    this.createCirclePoint(X, Y);
    this.bindEvent(this.canvas, cxt);
    //  CW=2*offsetX+R*2*3+2*X
    this.Draw(cxt, this.circleArr, [], null);
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
  /**
   * 计算选中的密码
   */
  public getSelectPwd(touches, pwdArr) {
    for (let i = 0; i < this.circleArr.length; i++) {
      const currentPoint = this.circleArr[i];
      const xdiff = Math.abs(currentPoint.X - touches.pageX);
      //       // 此处应加上 九宫格解锁的实际高度   解决BUG
      const ydiff = Math.abs(currentPoint.Y - touches.pageY + this.currheight);

      const dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
      if (dir > this.R || pwdArr.indexOf(i) >= 0) {
        continue;
      }
      pwdArr.push(i);
      break;
    }
  }
  private getUserSelectPwd(touches, pwdArr) {
    for (let i = 0; i < this.circleArr.length; i++) {
      const currentPoint = this.circleArr[i];
      const xdiff = Math.abs(currentPoint.X - touches.pageX);
      const ydiff = Math.abs(currentPoint.Y - touches.pageY);
      const dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
      if (dir > this.R || pwdArr.indexOf(i) >= 0) {
        continue;
      }
      pwdArr.push(i);
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
    const _this = this;
    let pwdArr = [];
    canvas.addEventListener('touchstart', (e) => {
      _this.getSelectPwd(e.touches[0], pwdArr);
    }, (error) => {
      console.log(error);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touches = e.touches[0];
      _this.getSelectPwd(touches, pwdArr);
      cxt.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
      // 此处应减去  九宫格解锁的实际高度
      _this.Draw(cxt, _this.circleArr, pwdArr, { X: touches.pageX, Y: touches.pageY - _this.currheight });
      // 阻止事件冒泡   2018-04-03 ionic 碰到 右滑返回上一页面 BUG
      const oEvent = e;
      oEvent.cancelBubble = true;
      oEvent.stopPropagation();
    }, false);
    canvas.addEventListener('touchend', (e) => {
      //  const touches = e.touches[0];
      cxt.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
      _this.Draw(cxt, _this.circleArr, pwdArr, null);
      _this.pwdResult.emit(pwdArr);
      cxt.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
      _this.Draw(cxt, _this.circleArr, [], { X: 0, Y: 0 });
      pwdArr = [];
    }, false);
  }

}
