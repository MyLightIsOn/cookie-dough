import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanyListComponent } from './component-list/company-list.component';
import { CompanyDetailComponent } from './component-detail/company-detail.component';

import { CompaniesService } from './companies.service';

import { CompaniesRoutingModule } from './companies-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CompaniesRoutingModule
    ],
    declarations: [
        CompanyListComponent,
        CompanyDetailComponent
    ],
    providers: [ CompaniesService ]
})
export class CompanyModule {}
