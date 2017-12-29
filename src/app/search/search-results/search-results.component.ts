import {Component, OnInit} from '@angular/core';

import { PaginationService } from '../../pagination/pagination.service';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { FilterCompaniesPipe } from '../../_pipes/filter-companies.pipe';
import { SortingPipe } from '../../_pipes/sorting.pipe';
import { ICompany } from '../../_interfaces/companies';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    providers: [ PaginationService, FilterCompaniesPipe, SortingPipe ]
})
export class SearchResultsComponent implements OnInit {

    constructor(private paginationService: PaginationService,
                private filterCompaniesPipe: FilterCompaniesPipe,
                private sortingCompaniesPipe: SortingPipe,
                private companyService: CompaniesService,
                public searchService: SearchService
    ) { }

    public companiesArray: any;
    public pager: any = {};
    public filteredCompanies: any;
    public searchText: string;
    public currentPage: number;
    public asc = true;
    public desc = false;
    public sortOpen = true;
    public sortTypeText;
    private companyData: any;

    ngOnInit() {
        // Uses the company service properties to set this components properties
        this.searchText = this.searchService.searchValueText;
        this.companyData = this.companyService.companyData;
        this.filteredCompanies = this.filterCompaniesPipe.transform(this.companyData, this.searchText);
        this.sortTypeText = this.searchService.sortType;
        this.paginationCheck(this.searchService.paginationPage);
        this.openSort();
        this.sortCheck();
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

        if (this.filteredCompanies) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }

            // Get pager object from service
            this.pager = this.paginationService.getPager(this.filteredCompanies.length, page);

            // Get current page of items
            this.companiesArray = this.filteredCompanies.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
        document.getElementById('app-container').scrollTo(0, 0);
    }

    // Uses the sorting pipe to sort the companies and then reset the pagination
    public sortBy(sortType: string, order: string, page: number) {
        if (this.filteredCompanies) {
            this.searchService.sortType = sortType;
            this.companiesArray = this.filteredCompanies.sort(this.sortingCompaniesPipe.transform(sortType, order));
            this.sortTypeText = this.searchService.sortType;
            this.sortOpen = false;
            this.setPage(page);
        }
    }

    // Changes teh sorting order
    public changeSortOrder() {
        this.asc = !this.asc;
        this.desc = !this.desc;

        // Ascending
        if (this.asc === true) {
            this.searchService.sortOrder = 'asc';
            this.sortBy(this.searchService.sortType, 'asc', this.searchService.paginationPage);

        // Descending
        } else {
            this.searchService.sortOrder = 'desc';
            this.sortBy(this.searchService.sortType, 'desc', this.searchService.paginationPage);
        }
    }


    // Checks to see if the array was sorted
    private sortCheck() {
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
}
