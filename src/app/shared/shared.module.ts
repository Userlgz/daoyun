import { PickerService } from './service/picker.service';
import { GestureComponent } from './compinents/gesture/gesture.component';
import { VarServiceService } from './service/var-service.service';
// import { User } from './class/user';
import { LocalStorageService } from './service/local-storage.service';
import { NetworkService } from './service/network.service';
import { CopyrightComponent } from './compinents/copyright/copyright.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        CopyrightComponent,
        GestureComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        // User,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CopyrightComponent,
        GestureComponent,
    ],
    providers: [
        NetworkService,
        LocalStorageService,
        VarServiceService,
        PickerService
    ]
})
export class SharedModule { }
