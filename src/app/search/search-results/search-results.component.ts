import { Component, OnInit } from '@angular/core';

import { PaginationService } from '../../pagination/pagination.service';
import { CompaniesService } from '../../companies/companies.service';
import { FilterCompaniesPipe } from '../../_pipes/filter-companies.pipe';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    providers: [ PaginationService, FilterCompaniesPipe ]
})
export class SearchResultsComponent implements OnInit {

    constructor(private paginationService: PaginationService,
                private filterCompaniesPipe: FilterCompaniesPipe,
                private companyService: CompaniesService
    ) { }

    public companiesArray: any;
    public pager: any = {};
    public filteredCompanies: any;
    public searchText: string;
    private companyData: any;

    ngOnInit() {

        // Uses the company service properties to set this components properties
        this.companyService.companyDataObservable.subscribe(value => {
            if (value) {
                this.searchText = this.companyService.searchValueText;
                this.companyData = this.companyService.companyData;
                this.filteredCompanies = this.filterCompaniesPipe.transform(this.companyData, this.searchText);
                this.setPage(1);
            } else {
                console.log('loading animation');
            }
        });
    }

    // Create pagination based on the number of items in the array
    setPage(page: number) {
        if (this.filteredCompanies) {
            if (page < 1 || page > this.pager.totalPages) {
                return;
            }

            // get pager object from service
            this.pager = this.paginationService.getPager(this.filteredCompanies.length, page);

            // get current page of items
            this.companiesArray = this.filteredCompanies.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }
}
