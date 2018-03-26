import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {

    constructor(public authService: AuthService, public http: HttpClient) {}

    public updateAccountSettings(updatedUser, token, id) {
        return this.http.put(environment['BASEURL'] + '/api/update-account', [updatedUser, token, id]).map((res) => {
            if (res['error']) {
                this.authService.errorMessage = res['error']['errors'][0]['message'];
                this.authService.errorResponse = true;
            } else {
                this.authService.errorResponse = false;
            }
        });
    }
}

