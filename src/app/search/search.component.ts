import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from './search.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    public searchText;
    public searchStarted = false;
    public searchSubmitted = false;

    constructor(
        private searchService: SearchService,
        public router: Router,
        public appService: AppService) {}

    ngOnInit() {
        this.searchService.paginationPage = undefined;
    }

    // Shifts search box;
    searchStart() {
        if (this.appService.device === 'mobile') {
            this.searchStarted = true;
            this.appService.fieldFocus();
        }
    }

    // Submits search, unhides search results
    searchSubmit() {
        this.searchService.searchValue(this.searchText);
        this.router.navigate(['/search-results']);
    }
}
