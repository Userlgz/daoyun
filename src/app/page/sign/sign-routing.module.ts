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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignPageRoutingModule {}
