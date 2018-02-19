import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies/companies.service';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';
import { searchAnimations } from './_animations/searchAnimations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ searchAnimations ]
})


export class AppComponent implements OnInit {
    email: string;
    password: string;
    message: string;

    constructor(
        private companyService: CompaniesService,
        public authService: AuthService,
        public loginService: LoginService) {}

    // Uses service to get a company list as soon as the app loads
    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            this.authService.isLoggedIn = true;
        }
        this.companyService.getAllCompanies().subscribe();
    }

    // Checks window width and returns the route for animations for mobile or desktop
    getPage(outlet) {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1199) {
            return outlet.activatedRouteData['page'];
        } else {
            return 'mobile-' + outlet.activatedRouteData['page'];
        }
    }

    login() {
        this.loginService.login(this.email, this.password);
    }

    logout() {
        this.authService.logout();
    }
}
