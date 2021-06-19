import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignPage } from './sign.page';

const routes: Routes = [
  {
    path: '',
    component: SignPage
  },
  {
    path: 'gesture',
    loadChildren: () => import('./gesture/gesture.module').then( m => m.GesturePageModule)
  },
  {
    path: 'one-click',
    loadChildren: () => import('./one-click/one-click.module').then( m => m.OneClickPageModule)
  },
  {
    path: 'limit-time',
    loadChildren: () => import('./limit-time/limit-time.module').then( m => m.LimitTimePageModule)
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'sign-record',
    loadChildren: () => import('./sign-record/sign-record.module').then( m => m.SignRecordPageModule)
  },
  {
    path: 'signing',
    loadChildren: () => import('./signing/signing.module').then( m => m.SigningPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPageRoutingModule {}
