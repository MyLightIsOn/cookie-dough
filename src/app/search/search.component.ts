import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../companies/company.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    public companies$;
    public company;

    constructor(private companyService: CompanyService) { }

    ngOnInit() {
        this.subscribeToCompanyData();
    }

    // Subscribes to the Observable from Company Service to populate the view
    subscribeToCompanyData() {
        this.companyService.companyDataObservable.subscribe((data) =>
            this.companies$ = CompanyService.createReviewStars(data['records']));
    }
}
