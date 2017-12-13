import { Component, OnInit, HostBinding } from '@angular/core';
import { CompaniesService } from './companies/companies.service';
import { fadeInAnimation } from './_animations/fade-in.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ CompaniesService ],
    animations: [fadeInAnimation]
})


export class AppComponent implements OnInit {

    constructor(private companyService: CompaniesService) {}

    /*Uses service to get a company list as soon as the app loads*/
    ngOnInit() {
        this.companyService.getAllCompanies();
    }

    public getRouterOutletState(outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
