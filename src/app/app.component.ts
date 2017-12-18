import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies/companies.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CompaniesService ]
})


export class AppComponent implements OnInit {

    constructor(private companyService: CompaniesService) {}

    /*Uses service to get a company list as soon as the app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies();
    }
}
