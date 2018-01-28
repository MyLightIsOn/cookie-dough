import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {environment} from '../environments/environment';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(email, password) {
        const body = ({'email': email, 'password': password});
        return this.http.post(environment['BASEURL'] + '/login', body);
    }

    checkResponse(res) {
        if (res['error']) {
            console.log('error');
            console.log(res);
            this.isLoggedIn = false;
        } else {
            console.log('good to go');
            console.log(res);
            this.isLoggedIn = true;
        }
        return res || {};
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}