import {Component, OnInit} from '@angular/core';

import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth.service';
import {AuthGuard} from '../../_guards/auth-guard.service';
import {AppService} from '../../app.service';

@Component({
    selector: 'app-profile-dashboard',
    templateUrl: './profile-account-settings.component.html',
    styleUrls: ['./profile-account-settings.component.css']
})
export class ProfileAccountSettingsComponent implements OnInit{
    public user: object;
    public updatedUser = {};
    public email: string;
    public company: string;
    public accountType = 'individual';
    public individualAccount: boolean;
    public userName: string;
    public editUserName: boolean;
    public editEmail: boolean;
    public editAccountType: boolean;
    public saveEnabled = false;

    constructor(
        public authGuard: AuthGuard,
        public authService: AuthService,
        public appService: AppService,
        public profileService: ProfileService) {}

    ngOnInit() {
        this.user = this.authGuard.getSession();
        this.setInfo();
    }

    setInfo() {
        this.email = this.user['user']['values']['field_19']['email'];
        this.userName = this.user['user']['values']['field_50'];
        if (this.user['user']['values']['field_51']) {
            this.company = this.user['user']['values']['field_51'];
            this.accountType = 'Business Admin';
            this.individualAccount = false;
        } else {
            this.individualAccount = true;
        }
    }

    editField(field) {
        if (field === 'userName') {
            this.editUserName = true;
        }

        if (field === 'email') {
            this.editEmail = true;
        }

        if (field === 'accountType') {
            this.editAccountType = true;
        }

        this.enableSave();
    }

    enableSave() {
        this.saveEnabled = true;
    }

    cancel() {
        this.saveEnabled = true;
        this.editUserName = false;
        this.editEmail = false;
        this.editAccountType = false;
        this.setInfo();
    }

    updateUser() {
        this.updatedUser['field_19'] = {};
        this.updatedUser['field_19']['email'] = this.email;
        this.updatedUser['field_50'] = this.userName;
        if (this.individualAccount) {
            this.updatedUser['field_22'] = 'individual';
        } else {
            this.updatedUser['field_22'] = 'admin';
        }
    }

    submitUpdate() {
        this.updateUser();
        this.profileService.updateAccountSettings(this.updatedUser, this.user['user']['token'], this.user['user']['id']).subscribe(() => {
            if (!this.authService.errorResponse) {
                this.editUserName = false;
                this.editEmail = false;
                this.editAccountType = false;
                this.saveEnabled = false;
                this.flashSuccess();
            }
        });
    }

    flashSuccess() {
        const app = this;
        app.authService.formSuccess = true;
        setTimeout(function () {
            app.authService.formSuccess = false;
        }, 3000);
    }
}
