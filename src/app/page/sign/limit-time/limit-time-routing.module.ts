import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimitTimePage } from './limit-time.page';

const routes: Routes = [
  {
    path: '',
    component: LimitTimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimitTimePageRoutingModule {}
