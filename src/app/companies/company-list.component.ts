import { Component, OnInit } from '@angular/core';

import { Company } from '../companies';
import { CompanyService } from './company.service';

@Component({
    selector: 'app-companies',
    templateUrl: './company-list.component.html',
    styleUrls: ['./companies.component.css'],
    providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
    companies: Company[];

    constructor(private companyService: CompanyService) { }

    ngOnInit(): void {
        this.getCompanies();
    }

    getCompanies(): void {
        this.companyService.getCompanies().then(companies => this.companies = companies);
    }
}
