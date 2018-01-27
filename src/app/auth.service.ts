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

    testLogin(email, password) {
        const body = ({'email': email, 'password': password});
        this.http.post(environment['BASEURL'] + '/login', body)
            .map(this.extractData).subscribe();
    }

    extractData(res: Response) {
        console.log(res);
        return res || {};
    }
    handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}