import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OneClickPage } from './one-click.page';

const routes: Routes = [
  {
    path: '',
    component: OneClickPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneClickPageRoutingModule {}
