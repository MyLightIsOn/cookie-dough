import { Component, OnInit } from '@angular/core';
import { CompanyService } from './companies/company.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CompanyService ]
})


export class AppComponent implements OnInit {

    constructor(private companyService: CompanyService) {}

    /*Uses service to get a company list as soon as the app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies();
    }
}
