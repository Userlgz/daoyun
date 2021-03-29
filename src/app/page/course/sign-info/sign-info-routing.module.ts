import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInfoPage } from './sign-info.page';

const routes: Routes = [
  {
    path: '',
    component: SignInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInfoPageRoutingModule {}
