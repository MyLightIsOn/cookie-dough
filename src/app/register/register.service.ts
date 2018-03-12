import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment} from '../../environments/environment';

@Injectable()
export class RegisterService {
    public registrationSuccess: boolean;
    public accountVerified = false;
    public id;

    constructor(
        private http: HttpClient,
        public router: Router,
        public authService: AuthService,
        public route: ActivatedRoute) {}

    registerUser(body) {
        return this.http.post(environment['BASEURL'] + '/api/register', body).map((res) => {
            if (res['error']) {
                this.authService.errorMessage = res['error']['errors'][0]['message'];
                this.authService.errorResponse = true;
                this.registrationSuccess = false;
            } else {
                this.registrationSuccess = true;
                this.authService.errorResponse = false;
            }
        });
    }

    verifiyUser(id) {
        const activate = {};
        activate['field_21'] = 'active';

        return this.http.put(environment['BASEURL'] + '/api/verify?id=' + id, activate).map((res) => {
            if (res['error']) {
                this.authService.errorMessage = res['error']['errors'][0]['message'];
                this.authService.errorResponse = true;
                this.registrationSuccess = false;
                this.accountVerified = false;
            } else {
                this.accountVerified = true;
            }
        });
    }
}
