import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinCoursePage } from './join-course.page';

const routes: Routes = [
  {
    path: '',
    component: JoinCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinCoursePageRoutingModule {}
