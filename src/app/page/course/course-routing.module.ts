import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursePage } from './course.page';

const routes: Routes = [
  {
    path: '',
    component: CoursePage,
    children: [
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
      },
      {
        path: 'course-info',
        loadChildren: () => import('./course-info/course-info.module').then( m => m.CourseInfoPageModule)
      },
      {
        path: '',
        redirectTo: '/course/members',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/course/members',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePageRoutingModule {}
