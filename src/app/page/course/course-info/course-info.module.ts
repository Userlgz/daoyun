import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourseInfoPageRoutingModule } from './course-info-routing.module';

import { CourseInfoPage } from './course-info.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseInfoPageRoutingModule,
    NgxQRCodeModule
  ],

  declarations: [CourseInfoPage]
})
export class CourseInfoPageModule {}
