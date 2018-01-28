import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;

    constructor(public authService: AuthService, public router: Router) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        const email = <HTMLInputElement>document.getElementById('email');
        const password = <HTMLInputElement>document.getElementById('password');
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        this.message = 'Trying to log in ...';

        this.authService.login(email.value, password.value).subscribe((res => {
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
        this.setMessage();
    }
}