import { CopyrightComponent } from './compinents/copyright/copyright.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CopyrightComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CopyrightComponent
    ]
})
export class SharedModule { }
