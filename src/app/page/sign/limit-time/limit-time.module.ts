import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LimitTimePageRoutingModule } from './limit-time-routing.module';

import { LimitTimePage } from './limit-time.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LimitTimePageRoutingModule
  ],
  declarations: [LimitTimePage]
})
export class LimitTimePageModule {}
