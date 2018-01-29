import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    CanLoad,
    Router,
    Route,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Set our navigation extras object
        // that contains our global query params and fragment
        const navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': this.authService.sessionID },
            fragment: 'anchor'
        };

        // Navigate to the login page with extras
        this.router.navigate(['/login'], navigationExtras);
        return false;
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}