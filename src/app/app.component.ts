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
    public screenSize: string;
    public listOpen = false;
    public user;

    constructor(
        private companyService: CompaniesService,
        public authService: AuthService,
        private loginService: LoginService,
        private appService: AppService) {}

    // Gets the screensize for animations, retrieves all of the companies,
    // subscribes to the auth service session and sets it as the user property
    // and then gets the user stored in local storage and uses that for the user property.
    public ngOnInit(): void {
        this.screenSize = this.appService.getScreenSize();
        this.companyService.getAllCompanies().subscribe();
        this.authService.subject.subscribe(res => {
            this.user =  res['session']['user'];
        });
        this.authService.getLocalStorage();
    }

    // Checks window width and returns the route for animations for mobile or desktop
    public getPage(outlet): string {
        if (this.screenSize === 'desktop') {
            return outlet.activatedRouteData['page'];
        } else {
            return 'mobile-' + outlet.activatedRouteData['page'];
        }
    }

    // Toggles the sorting list dropdown
    public toggleDropdown(): void {
        this.listOpen = !this.listOpen;
    }

    // Passes the email and password to the login service
    public login(): void {
        this.loginService.login(this.email, this.password);
    }

    // Logs the user out
    public logout(): void {
        this.toggleDropdown();
        this.authService.logout();
    }
}
