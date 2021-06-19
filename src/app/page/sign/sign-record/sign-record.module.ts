import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignRecordPageRoutingModule } from './sign-record-routing.module';

import { SignRecordPage } from './sign-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignRecordPageRoutingModule
  ],
  declarations: [SignRecordPage]
})
export class SignRecordPageModule {}
