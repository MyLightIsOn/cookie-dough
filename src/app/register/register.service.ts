import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment} from '../../environments/environment';

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient, public router: Router) {}

    registerUser(body) {
        return this.http.post(environment['BASEURL'] + '/api/register', body).map((res) => {
            console.log(res);
            return res;
        });
    }
}
