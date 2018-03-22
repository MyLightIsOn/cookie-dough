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

    public isLoggedIn = false;
    public session: object;
    public errorResponse = false;
    public errorMessage: string;
    public errorHighlight;
    public redirectUrl: string;

    public setLocalStorage(session) {
        localStorage.setItem('currentUser', JSON.stringify(session));
    }

    public login(email, password) {
        const body = ({'email': email, 'password': password});
        return this.http.post(environment['BASEURL'] + '/api/login', body);
    }

    public checkResponse(res) {
        if (res['error']) {
            this.errorMessage = res['error']['errors'][0]['message'];
            this.errorResponse = true;
            this.errorHighlight = true;
            this.isLoggedIn = false;
        } else {
            this.setLocalStorage(res['session']);
            this.session = res['session'];
            this.errorResponse = false;
            this.errorHighlight = false;
            this.isLoggedIn = true;
        }
        return res;
    }

    logout(): void {
        this.isLoggedIn = false;
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
