import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';

import { RegisterRoutingModule } from './register.routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RegisterRoutingModule
    ],
    declarations: [
        RegisterComponent,
    ],
    providers: [
        RegisterService
    ]
})
export class RegisterModule {}
