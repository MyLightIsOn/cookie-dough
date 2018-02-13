import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
    email: string;
    password: string;
    message: string;

    constructor(private companyService: CompaniesService, public authService: AuthService, public router: Router) {}

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

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        this.message = 'Trying to log in ...';

        this.authService.login(this.email, this.password).subscribe((res => {
            this.setMessage();
            this.authService.checkResponse(res);
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile';

                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            }
        }));
    }

    logout() {
        this.authService.logout();
    }
}
