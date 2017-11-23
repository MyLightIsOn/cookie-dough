import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../companies/company.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    public companies$;

    constructor(private companyService: CompanyService) { }

    ngOnInit() {
        this.companyList();
    }

    // Subscribes to the Observable from Company Service to populate the view
    companyList() {
        this.companyService.companyDataObservable.subscribe((data) => this.companies$ = data[0].records);
    }
}
