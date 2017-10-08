import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyListComponent }    from './company-list.component';
import { CompanyDetailComponent }  from './company-detail.component';

const companiesRoutes: Routes = [
    { path: 'companies',  component: CompanyListComponent },
    { path: 'company/:id', component: CompanyDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(companiesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CompaniesRoutingModule { }