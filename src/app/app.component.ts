import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies/companies.service';
import { AuthService } from './auth.service';
import { searchAnimations } from './_animations/searchAnimations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ searchAnimations ]
})


export class AppComponent implements OnInit {

    constructor(private companyService: CompaniesService, public authService: AuthService) {}

    // Uses service to get a company list as soon as the app loads
    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.authService.isLoggedIn = true;
        }
        this.companyService.getAllCompanies().subscribe();
    }

    // returns the route for animations
    getPage(outlet) {
        return outlet.activatedRouteData['page'];
    }

    logout() {
        this.authService.logout();
    }
}
