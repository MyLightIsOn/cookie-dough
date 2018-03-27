import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable()
export class LoginService {
    constructor(private authService: AuthService, public router: Router) {}

    login(email: string, password: string) {
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        this.authService.login(email, password).subscribe();

        /*((res => {
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/search';

                // Redirect the user
                this.router.navigate([redirect], navigationExtras);
            }
        }))*/;
    }
}
