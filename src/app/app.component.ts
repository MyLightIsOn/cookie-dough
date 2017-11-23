import { Component, OnInit, NgModule } from '@angular/core';
import { CompanyService } from './companies/company.service';

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

    /*Uses service to get a company list as soon as the app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies();
    }
}
