import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { ProfileAccountSettingsComponent } from './profile-account-settings/profile-account-settings.component';
import { ProfileService } from './profile.service';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCompanySettingsComponent } from './profile-company-settings/profile-company-settings.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        ProfileAccountSettingsComponent,
        ProfileCompanySettingsComponent
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule { }
