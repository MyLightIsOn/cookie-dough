import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs/Subject';
import {ISession} from './_interfaces/session';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router) {}

    public isLoggedIn = true;
    public formSuccess = false;
    public errorResponse = false;
    public errorMessage: string;
    public errorHighlight;
    public redirectUrl: string;
    public subject = new Subject();
    public session;

    // Sets the local storage for this session
    static setLocalStorage(session: ISession): void {
        localStorage.setItem('currentUser', JSON.stringify(session));
    }

    // Checks to see if the is already a user in local storage. If it is
    // this user is set as the subject. If not, the user remains logged out.
    public getLocalStorage(): any {
        if (localStorage.getItem('currentUser')) {
            this.isLoggedIn = true;
            this.subject.next(JSON.parse(localStorage.getItem('currentUser')));
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }

    // Updates the local storage by iterating through the update and the current user
    // looking for matches in properties. If there's is a match, an update is made.
    public updateLocalStorage(update: object): void {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const currentUserValues = currentUser['session']['user']['values'];

        // Iterate through the current user properties
        for (const prop in currentUserValues) {
            if (currentUserValues.hasOwnProperty(prop)) {

                // Looking for a match in the updated properties
                for (const updatedProp in update) {
                    if (update.hasOwnProperty(updatedProp)) {
                        if (prop === updatedProp) {
                            currentUserValues[prop] = update[updatedProp];
                        }
                    }
                }
            }
        }
        this.subject.next(currentUser);
        AuthService.setLocalStorage(currentUser);
    }

    // Logs the user in and checks the response for an error
    public login(email: string, password: string): Observable<void> {
        const body = ({'email': email, 'password': password});
        return this.http.post(environment['BASEURL'] + '/api/login', body).map(res => {
            this.session = res;
            this.checkResponse(this.session);
        }).share();
    }

    // After login in, the user will be redirected accordingly.
    public postLogin(): void {
        const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
        };

        if (this.isLoggedIn) {
            // Get the redirect URL from our auth service
            // If no redirect has been set, use the default
            const redirect = this.redirectUrl ? this.redirectUrl : '/search';

            // Redirect the user
            this.router.navigate([redirect], navigationExtras);
        }
    }

    // Checks the response and displays the appropriate error if need be. Otherwise
    // it will set the local storage, turn off errors, and log the user in then
    // redirect.
    public checkResponse(res: ISession): object {
        if (res['error']) {
            this.errorMessage = res['error']['errors'][0]['message'];
            this.errorResponse = true;
            this.errorHighlight = true;
            this.isLoggedIn = false;
            return res;
        } else {
            AuthService.setLocalStorage(res);
            this.subject.next(res);
            this.errorResponse = false;
            this.errorHighlight = false;
            this.isLoggedIn = true;
            this.postLogin();
        }
    }

    public closeError(): void {
        this.errorResponse = false;
    }

    // Logs the user out and clears the local storage.
    logout(): void {
        this.isLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
