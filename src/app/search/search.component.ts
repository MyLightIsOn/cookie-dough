import { Component } from '@angular/core';

import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    public companies$: ICompany;
    public company;
    public searchStarted = false;
    public searchSubmitted = false;

    constructor(private companyService: CompaniesService) {}

    // Shifts search box;
    searchStart() {
        this.searchStarted = true;
    }

    // Submits search, unhides search results
    searchSubmit() {
        const inputElement = <HTMLInputElement>document.getElementById('main-search');
        this.companyService.searchValue(inputElement.value);
    }
}
