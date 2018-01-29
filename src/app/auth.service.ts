import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient, public router: Router) {}

    isLoggedIn = false;
    sessionID: object;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(email, password) {
        const body = ({'email': email, 'password': password});
        return this.http.post(environment['BASEURL'] + '/login', body).map(res => res);
    }

    checkResponse(res) {
        if (res['error']) {
            console.log('error');
            console.log(res);
            this.isLoggedIn = false;
        } else {
            console.log('good to go');
            this.setLocalStorage(res);
            this.sessionID = res;
            this.isLoggedIn = true;
        }
        return res || {};
    }

    setLocalStorage(session) {
        localStorage.setItem('currentUser', JSON.stringify(session));
    }

    logout(): void {
        this.isLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['/']);
    }
}