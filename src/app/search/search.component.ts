import {Component, HostBinding, OnInit} from '@angular/core';

import { CompaniesService } from '../companies/companies.service';

import { homeAnimation } from '../_animations/home.animation';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [ homeAnimation ]
})

export class SearchComponent implements OnInit{
    @HostBinding('@homeAnimation') homeAnimation = true;

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
