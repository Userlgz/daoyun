import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigningPage } from './signing.page';

const routes: Routes = [
  {
    path: '',
    component: SigningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigningPageRoutingModule {}
