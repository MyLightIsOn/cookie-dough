import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';

const profileRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: '',
                children: [
                    { path: 'company-profile', component: ProfileCompanyComponent },
                    { path: '', component: ProfileDashboardComponent }
                ]
            }
        ]
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
