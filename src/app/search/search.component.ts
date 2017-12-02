import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies/companies.service';

import { ICompany } from '../_interfaces/companies';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    public companies$: ICompany;
    public company;

    constructor(private companyService: CompaniesService) { }

    ngOnInit() {
        this.subscribeToCompanyData();
    }

    // Subscribes to the Observable from Company Service to populate the view
    subscribeToCompanyData() {
        this.companyService.companyDataObservable.subscribe((data) =>
            this.companies$ = CompaniesService.createReviewStars(data['records']));
    }
}
