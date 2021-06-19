import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickPageRoutingModule } from './quick-routing.module';

import { QuickPage } from './quick.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickPageRoutingModule
  ],
  declarations: [QuickPage]
})
export class QuickPageModule {}
