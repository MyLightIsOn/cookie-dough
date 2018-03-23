import { Component, OnInit } from '@angular/core';

import { CompaniesService } from './companies/companies.service';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { AppService } from './app.service';

import { searchAnimations } from './_animations/searchAnimations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ searchAnimations ]
})


export class AppComponent implements OnInit {
    public email: string;
    public password: string;
    public message: string;
    public screenSize: string;
    public listOpen = false;
    public session;

    constructor(
        private companyService: CompaniesService,
        public authService: AuthService,
        public loginService: LoginService,
        public appService: AppService) {}

    // Uses service to get a company list as soon as the app loads
    public ngOnInit() {
        this.authService.getLocalStorage();
        this.screenSize = this.appService.getScreenSize();
        this.companyService.getAllCompanies().subscribe();
    }

    // Checks window width and returns the route for animations for mobile or desktop
    public getPage(outlet) {
        if (this.screenSize === 'desktop') {
            return outlet.activatedRouteData['page'];
        } else {
            return 'mobile-' + outlet.activatedRouteData['page'];
        }
    }

    // Toggles the sorting list dropdown
    public toggleDropdown() {
        this.listOpen = !this.listOpen;
    }

    // Passes the email and password to the login service
    public login() {
        this.loginService.login(this.email, this.password);
    }

    // Logs the user out
    public logout() {
        this.authService.logout();
    }
}
