import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies/companies.service';
import { searchAnimations } from './_animations/searchAnimations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CompaniesService ],
    animations: [ searchAnimations ]
})


export class AppComponent implements OnInit {

    constructor(private companyService: CompaniesService) {}

    /*Uses service to get a company list as soon as the app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies();
    }

    getPage(outlet) {
        return outlet.activatedRouteData['page'] || 'one';
    }
}
