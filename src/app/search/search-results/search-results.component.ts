import {Component, OnInit} from '@angular/core';

import { PaginationService } from '../../pagination/pagination.service';
import { CompaniesService } from '../../companies/companies.service';
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
                private companyService: CompaniesService
    ) { }

    public companiesArray: any;
    public pager: any = {};
    public filteredCompanies: any;
    public searchText: string;
    public currentPage: number;
    private companyData: any;

    ngOnInit() {
        // Uses the company service properties to set this components properties
        this.searchText = this.companyService.searchValueText;
        this.companyData = this.companyService.companyData;
        this.filteredCompanies = this.filterCompaniesPipe.transform(this.companyData, this.searchText);
        this.paginationCheck(this.companyService.paginationPage);
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
        this.companyService.paginationPage = page;

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
    public sortBy(sortType) {
        this.companiesArray = this.filteredCompanies.sort(this.sortingCompaniesPipe.transform(sortType));
        this.setPage(1);
    }
}
