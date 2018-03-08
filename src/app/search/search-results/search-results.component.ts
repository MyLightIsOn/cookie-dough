import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { PaginationService } from '../../pagination/pagination.service';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { FilterCompaniesPipe } from '../../_pipes/filter-companies.pipe';
import { ICompany } from '../../_interfaces/companies';
import { AppService } from '../../app.service';

import * as _ from 'lodash';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    providers: [ PaginationService, FilterCompaniesPipe ]
})
export class SearchResultsComponent implements OnInit {

    constructor(private paginationService: PaginationService,
                private filterCompaniesPipe: FilterCompaniesPipe,
                private companyService: CompaniesService,
                public searchService: SearchService,
                public appService: AppService,
                private router: Router
    ) { }

    public companiesArray: any;
    public pager: any = {};
    public filteredCompanies: any;
    public sortedCompanies: any;
    public searchText = this.searchService.searchValueText;
    public newSearchText: string;
    public currentPage: number;
    public desc: boolean;
    public sortOpen = true;
    public sortTypeText;
    private companyData: any;
    public lat: number;
    public lng: number;
    public companyPreview;

    ngOnInit() {
        // Uses the company service properties to set this components properties
        this.companyData = this.companyService.companyData;
        this.filteredCompanies = this.filterCompaniesPipe.transform(this.companyData, this.searchText);
        this.sortTypeText = this.searchService.sortType;
        this.openSort();
        this.sortCheck();
        this.paginationCheck(this.searchService.paginationPage);
    }

    // Checks to see if company URL is set. If not, then ID will be used.
    public setIdentifier(company: ICompany) {
        if (company['field_33_raw'] !== undefined) {
            return company['field_33_raw'];
        } else {
            return company['id'];
        }
    }

    // Checks to see what page the search results were on if they user went to a company detail
    public paginationCheck(page: number) {
        if (page !== undefined) {
            this.setPage(page);
        }  else {
            this.setPage(1);
        }
    }

    // Create pagination based on the number of items in the array
    public setPage(page: number) {
        this.searchService.paginationPage = page;

        if (this.sortedCompanies) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }

            // Get pager object from service
            this.pager = this.paginationService.getPager(this.sortedCompanies.length, page);

            // Get current page of items
            this.companiesArray = this.sortedCompanies.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
        document.getElementById('app-container').scrollTo(0, 0);
    }

    // Uses the sorting pipe to sort the companies and then reset the pagination
    public sortBy(sortType: string, order: string, page: number) {
        if (this.filteredCompanies) {
            this.searchService.sortType = sortType;
            this.sortedCompanies = _.orderBy(this.filteredCompanies, [function(o) {return o[sortType]; }], [order]);
            this.sortTypeText = this.searchService.sortType;
            this.sortOpen = false;
            this.setPage(page);
        }
    }

    // Changes the sorting order
    public changeSortOrder() {
        this.desc = !this.desc;

        // Ascending
        if (this.desc === false) {
            this.searchService.sortOrder = 'asc';
            this.sortBy(this.searchService.sortType, this.searchService.sortOrder, this.searchService.paginationPage);

        // Descending
        } else {
            this.searchService.sortOrder = 'desc';
            this.sortBy(this.searchService.sortType, this.searchService.sortOrder, this.searchService.paginationPage);
        }
    }


    // Checks to see if the array was sorted
    private sortCheck() {
        if (this.searchService.sortOrder === 'desc') {
            this.desc = true;
        }

        this.sortBy(this.searchService.sortType, this.searchService.sortOrder, this.searchService.paginationPage);
    }


    // Toggles the sorting list dropdown
    public openSort() {
        this.sortOpen = !this.sortOpen;
    }

    // Clears the sorting data
    public resetData() {
        this.sortOpen = false;
        this.searchService.sortType = 'field_3';
        this.searchService.sortOrder = 'asc';
        this.searchService.paginationPage = 1;
    }

    // Sorts the search results by attribute
    public setSortName() {
        if (this.sortTypeText === 'field_3') {
            return 'Name';
        }

        if (this.sortTypeText === 'field_34') {
            return 'Country';
        }

        if (this.sortTypeText === 'field_32_raw') {
            return 'Stars';
        }

        if (this.sortTypeText === 'field_31') {
            return 'Reviews';
        }
    }

    // Lets the user search from the search results input in desktop mode.
    public searchAgain() {
        this.searchText = this.newSearchText;
        this.ngOnInit();
    }

    public previewCompany(company) {
        if (this.appService.device === 'mobile') {
            this.router.navigate(['/', this.setIdentifier(company)]);
        } else {
            this.companyPreview = company;
            this.lat = company['field_4_raw']['latitude'];
            this.lng = company['field_4_raw']['longitude'];
        }
    }
}
