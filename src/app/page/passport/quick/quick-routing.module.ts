import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickPage } from './quick.page';

const routes: Routes = [
  {
    path: '',
    component: QuickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickPageRoutingModule {}
