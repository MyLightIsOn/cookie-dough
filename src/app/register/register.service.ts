import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { FlashMessagesService } from '../flash-messages.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegisterService {
    public registrationSuccess: boolean;
    public accountVerified = false;
    public id: string;

    constructor(
        private http: HttpClient,
        public router: Router,
        public authService: AuthService,
        public flashMessageService: FlashMessagesService) {}

    registerUser(body: object): Observable<void> {
        return this.http.post(environment['BASEURL'] + '/api/register', body).map((res) => {
            if (res['error']) {
                this.registrationSuccess = false;
                this.flashMessageService.createErrorMessage(res['error']['errors']);
            } else {
                this.registrationSuccess = true;
                this.flashMessageService.createSuccessMessage('registration');
            }
        });
    }

    verifiyUser(id): Observable<void> {
        const activate = {};
        activate['field_24'] = 'active';
        return this.http.put(environment['BASEURL'] + '/api/verify?id=' + id, activate).map((res) => {
            if (res['error']) {
                this.flashMessageService.createErrorMessage(res['error']['errors']);
                this.registrationSuccess = false;
                this.accountVerified = false;
            } else {
                this.accountVerified = true;
            }
        });
    }
}
