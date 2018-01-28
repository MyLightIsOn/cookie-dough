import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        ProfileCompanyComponent,
        ProfileDashboardComponent
    ]
})
export class ProfileModule { }
