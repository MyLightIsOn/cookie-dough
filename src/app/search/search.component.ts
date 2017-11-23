import { Component, OnInit, NgModule } from '@angular/core';
import { CompanyService } from '../companies/company.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    public companies$;

    constructor(private companyService: CompanyService) { }

    ngOnInit() {
        this.subscribeToCompanyData();
    }

    // Subscribes to the Observable from Company Service to populate the view
    subscribeToCompanyData() {
        this.companyService.companyDataObservable.subscribe((data) => this.companies$ = data[0].records);
    }
}
