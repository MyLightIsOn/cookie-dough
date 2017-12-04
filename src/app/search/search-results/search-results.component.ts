import { Component, Input, OnChanges } from '@angular/core';

import { ICompany } from '../../_interfaces/companies';
import { PaginationService } from '../../pagination/pagination.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [ PaginationService ]
})
export class SearchResultsComponent implements OnChanges {
  @Input() companies$;
  @Input() company: ICompany;
  @Input() searchSubmitted;

  constructor(private paginationService: PaginationService) { }

    private companiesArray;
    private pager: any = {};

  ngOnChanges() {
    this.setPage(1);
  }

  // Create pagination based on the number of items in the array
  setPage(page: number) {
      if (this.companies$) {
          /*this.allItems = this.companies$;*/
          if (page < 1 || page > this.pager.totalPages) {
              return;
          }

          // get pager object from service
          this.pager = this.paginationService.getPager(this.companies$.length, page);

          // get current page of items
          this.companiesArray = this.companies$.slice(this.pager.startIndex, this.pager.endIndex + 1);
      }
  }
}
