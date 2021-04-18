import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinCoursePageRoutingModule } from './join-course-routing.module';

import { JoinCoursePage } from './join-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinCoursePageRoutingModule
  ],
  declarations: [JoinCoursePage]
})
export class JoinCoursePageModule {}
