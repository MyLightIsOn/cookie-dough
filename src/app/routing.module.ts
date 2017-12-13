import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { CanDeactivateGuard } from './_guards/can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth-guard.service';

const appRoutes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard]},
    {path: '',   redirectTo: '/search', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard
    ],
    declarations: []
})
export class RoutingModule { }
