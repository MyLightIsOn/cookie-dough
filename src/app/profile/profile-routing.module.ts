import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileAccountSettingsComponent } from './profile-account-settings/profile-account-settings.component';

import { AuthGuard } from '../_guards/auth-guard.service';
import {ProfileCompanySettingsComponent} from './profile-company-settings/profile-company-settings.component';

const profileRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        data: { page: 'profile' },
        canActivate: [AuthGuard],
    },
    {
        path: 'account-settings',
        component: ProfileAccountSettingsComponent,
        data: { page: 'account-settings' },
        canActivate: [AuthGuard],
    },
    {
        path: 'company-settings',
        component: ProfileCompanySettingsComponent,
        data: { page: 'company-settings' },
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRoutingModule {}
