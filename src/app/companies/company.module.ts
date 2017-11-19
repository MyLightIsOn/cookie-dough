import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanyListComponent } from './component-list/company-list.component';
import { CompanyDetailComponent } from './component-detail/company-detail.component';

import { CompanyService } from './company.service';

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
    providers: [ CompanyService ]
})
export class CompanyModule {}