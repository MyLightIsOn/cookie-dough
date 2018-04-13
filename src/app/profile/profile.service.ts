import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from '../flash-messages.service';

@Injectable()
export class ProfileService {

    constructor(
        public authService: AuthService,
        public http: HttpClient,
        public flashMessageService: FlashMessagesService) {}

    public updateAccountSettings(updatedUser: object, token: string, id: string): Observable<void> {
        return this.http.put(environment['BASEURL'] + '/api/update-account', [updatedUser, token, id]).map((res) => {
            if (res['error']) {
                this.flashMessageService.createErrorMessage(res['error']['errors']);
            } else {
                this.flashMessageService.createSuccessMessage('account update');
                this.authService.updateLocalStorage(updatedUser, 'user');
            }
        });
    }

    uploadImage(fileToUpload): Observable<Object> {
        const formData = new FormData();
        formData.append('image', fileToUpload);
        return this.http.post(environment['BASEURL'] + '/api/upload-image', formData).map((res) => {
            if (res['error']) {
                this.flashMessageService.createErrorMessage(res['error']['errors']);
            } else {
                return res;
            }
        });
    }

    updateCompanySettings(updatedCompany, id, updatedImage?) {
        if (updatedImage) {
            updatedCompany['field_3'] = updatedImage['id'];
        }

        return this.http.put(environment['BASEURL'] + '/api/update-company?id=' + id, [updatedCompany]).map((res) => {
            if (res['error']) {
                this.flashMessageService.createErrorMessage(res['error']['errors']);
            } else {
                this.authService.updateLocalStorage(res, 'company');
                this.flashMessageService.createSuccessMessage('company update');
            }
        });
    }
}
