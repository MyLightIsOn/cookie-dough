import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyListComponent } from './component-list/company-list.component';


const companiesRoutes: Routes = [
    {
        path: 'companies',
        component: CompanyListComponent
    }
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
