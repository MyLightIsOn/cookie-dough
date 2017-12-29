import {Component, OnInit} from '@angular/core';

import { SearchService } from './search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    public company;
    public searchStarted = false;
    public searchSubmitted = false;

    constructor(private searchService: SearchService) {}

    ngOnInit() {
        this.searchService.paginationPage = undefined;
    }

    // Shifts search box;
    searchStart() {
        this.searchStarted = true;
    }

    // Submits search, unhides search results
    searchSubmit() {
        const inputElement = <HTMLInputElement>document.getElementById('main-search');
        this.searchService.searchValue(inputElement.value);
    }
}
