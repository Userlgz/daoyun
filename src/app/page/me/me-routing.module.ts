import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MePage } from './me.page';

const routes: Routes = [
  {
    path: '',
    component: MePage
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m => m.UserInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
