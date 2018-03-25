import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileAccountSettingsComponent } from './profile-account-settings/profile-account-settings.component';
import { ProfileService } from './profile.service';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        ProfileCompanyComponent,
        ProfileAccountSettingsComponent
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
