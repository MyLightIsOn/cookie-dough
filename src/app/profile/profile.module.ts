import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileAccountSettingsComponent } from './profile-account-settings/profile-account-settings.component';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        ProfileCompanyComponent,
        ProfileAccountSettingsComponent
    ]
})
export class ProfileModule { }
