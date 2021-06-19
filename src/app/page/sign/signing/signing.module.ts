import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigningPageRoutingModule } from './signing-routing.module';

import { SigningPage } from './signing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigningPageRoutingModule
  ],
  declarations: [SigningPage]
})
export class SigningPageModule {}
