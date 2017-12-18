import {Component, HostBinding, OnInit} from '@angular/core';

import { PaginationService } from '../../pagination/pagination.service';
import { CompaniesService } from '../../companies/companies.service';
import { FilterCompaniesPipe } from '../../_pipes/filter-companies.pipe';
import { ICompany } from '../../_interfaces/companies';

import { stayPutAnimation } from '../../_animations/stay-put.animation';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    providers: [ PaginationService, FilterCompaniesPipe ],
    animations: [ stayPutAnimation ]
})
export class SearchResultsComponent implements OnInit {
    @HostBinding('@stayPutAnimation') stayPutAnimation = true;

    constructor(private paginationService: PaginationService,
                private filterCompaniesPipe: FilterCompaniesPipe,
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
        this.companyService.companyDataObservable.subscribe(value => {
            if (value) {
                this.searchText = this.companyService.searchValueText;
                this.companyData = this.companyService.companyData;
                this.filteredCompanies = this.filterCompaniesPipe.transform(this.companyData, this.searchText);
                this.paginationCheck(this.companyService.paginationPage);
            } else {
                console.log('loading animation');
            }
        });
    }

    // Checks to see if company URL is set. If not, then ID will be used.
    setIdentifier(company: ICompany) {
        if (company['field_33_raw'] !== undefined) {
            return company['field_33_raw'];
        } else {
            return company['id'];
        }
    }

    paginationCheck(page: number) {
        console.log('Page set to:' + page);
        if (page !== undefined) {
            this.setPage(page);
        }  else {
            this.setPage(1);
        }
    }

    // Create pagination based on the number of items in the array
    setPage(page: number) {
        this.companyService.paginationPage = page;

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
