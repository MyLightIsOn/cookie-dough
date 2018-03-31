import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from './search.service';
import { AppService } from '../app.service';
import { FlashMessagesService } from '../flash-messages.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    public searchText;
    public searchStarted = false;
    public searchSubmitted = false;
    public search;
    public searchError;

    constructor(
        private searchService: SearchService,
        public router: Router,
        public appService: AppService,
        public flashMessageService: FlashMessagesService) {}

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
        if (!this.searchText) {
            this.searchError = true;
            this.flashMessageService.error = true;
            this.flashMessageService.createErrorMessage('blank search');
        } else {
            this.searchError = false;
            this.flashMessageService.error = false;
            this.appService.showNav();
            this.searchService.searchValue(this.searchText);
            this.router.navigate(['/search-results']);
        }
    }
}
