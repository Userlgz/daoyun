import { LocalStorageService } from './service/local-storage.service';
import { NetworkService } from './service/network.service';
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
        IonicModule,

    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CopyrightComponent,
    ],
    providers: [
        NetworkService,
        LocalStorageService
    ]
})
export class SharedModule { }
