import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OneClickPageRoutingModule } from './one-click-routing.module';

import { OneClickPage } from './one-click.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OneClickPageRoutingModule
  ],
  declarations: [OneClickPage]
})
export class OneClickPageModule {}
