import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignRecordPage } from './sign-record.page';

const routes: Routes = [
  {
    path: '',
    component: SignRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignRecordPageRoutingModule {}
