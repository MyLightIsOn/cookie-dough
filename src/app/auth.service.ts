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
    session: object;
    errorResponse = false;
    errorMessage: string;
    errorHighlight;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(email, password) {
        const body = ({'email': email, 'password': password});
        return this.http.post(environment['BASEURL'] + '/api/login', body);
    }

    checkResponse(res) {
        if (res['error']) {
            this.errorMessage = res['error']['errors'][0]['message'];
            this.errorResponse = true;
            this.errorHighlight = true;
            this.isLoggedIn = false;
        } else {
            this.setLocalStorage(res['session']);
            this.session = res;
            this.errorResponse = false;
            this.errorHighlight = false;
            this.isLoggedIn = true;
        }
        return res;
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
