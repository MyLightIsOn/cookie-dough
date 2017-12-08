import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

import { ICompany } from '../../_interfaces/companies';
import { PaginationService } from '../../pagination/pagination.service';
import { FilterCompaniesPipe } from '../../_pipes/filter-companies.pipe';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss'],
    providers: [ PaginationService, FilterCompaniesPipe ]
})
export class SearchResultsComponent implements OnChanges {
    @Input() companies$;
    @Input() company: ICompany;
    @Input() searchSubmitted;
    @Output() companiesReset = new EventEmitter();

    constructor(private paginationService: PaginationService, private filterCompaniesPipe: FilterCompaniesPipe) { }

    public companiesArray;
    public pager: any = {};
    public filteredCompanies;

    ngOnChanges() {
        // Takes the companies returned from the filter and uses them to create the pagination if necessary.
        this.filteredCompanies = this.filterCompaniesPipe.transform(this.companies$, this.company);
        this.setPage(1);
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

    // Sends a reset event up to the Search Component
    newSearch() {
        this.companiesReset.emit(this.searchSubmitted);
    }
}
