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
    path: 'member-info',
    loadChildren: () => import('./member-info/member-info.module').then( m => m.MemberInfoPageModule)
  },
  {
    path: 'sign-info',
    loadChildren: () => import('./sign-info/sign-info.module').then( m => m.SignInfoPageModule)
  },  {
    path: 'create-course',
    loadChildren: () => import('./create-course/create-course.module').then( m => m.CreateCoursePageModule)
  },
  {
    path: 'join-course',
    loadChildren: () => import('./join-course/join-course.module').then( m => m.JoinCoursePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePageRoutingModule {}
