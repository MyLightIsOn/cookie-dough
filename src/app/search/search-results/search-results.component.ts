import { Component, OnInit, Input } from '@angular/core';

import { ICompany } from '../../_interfaces/companies';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() companies$;
  @Input() company: ICompany;

  constructor() { }

  ngOnInit() {
  }
}
