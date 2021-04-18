import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCoursePageRoutingModule } from './create-course-routing.module';

import { CreateCoursePage } from './create-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCoursePageRoutingModule,
    SharedModule
  ],
  declarations: [CreateCoursePage]
})
export class CreateCoursePageModule {}
