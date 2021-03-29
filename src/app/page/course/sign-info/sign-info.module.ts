import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInfoPageRoutingModule } from './sign-info-routing.module';

import { SignInfoPage } from './sign-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInfoPageRoutingModule
  ],
  declarations: [SignInfoPage]
})
export class SignInfoPageModule {}
