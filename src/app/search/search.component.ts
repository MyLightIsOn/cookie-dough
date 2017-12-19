import {Component, OnInit} from '@angular/core';

import { CompaniesService } from '../companies/companies.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    public company;
    public searchStarted = false;
    public searchSubmitted = false;

    constructor(private companyService: CompaniesService) {}

    ngOnInit() {
        this.companyService.paginationPage = undefined;
    }

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
