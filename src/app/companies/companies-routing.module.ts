import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyListComponent }    from './company-list.component';
import { CompanyDetailComponent }  from './company-detail.component';

import { CanDeactivateGuard } from "../can-deactivate-guard.service";

import { CompaniesResolverService } from "./companies-resolver.service"

const companiesRoutes: Routes = [
    {
        path: 'companies',
        component: CompanyListComponent
    },
    {
        path: 'company/:id',
        component: CompanyDetailComponent,
        canDeactivate: [
            CanDeactivateGuard
        ],
        resolve: {
            company: CompaniesResolverService
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(companiesRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CompaniesResolverService
    ],
})
export class CompaniesRoutingModule { }