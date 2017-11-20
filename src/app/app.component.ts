import { Component, OnInit, NgModule } from '@angular/core';
import { CompanyService } from './companies/company.service';
import { Company } from './_interfaces/companies';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@NgModule({
    providers: [ CompanyService ]
})


export class AppComponent implements OnInit {
    public companies$;

    constructor(private companyService: CompanyService) {}

    /*Calls GET request for company list as soon as app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies().subscribe((data) => {
           this.companies$ = data[0].records;
        });
    }
}
