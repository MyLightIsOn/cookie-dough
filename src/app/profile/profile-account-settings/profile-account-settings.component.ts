import {Component, OnInit} from '@angular/core';

import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth.service';
import {AppService} from '../../app.service';

@Component({
    selector: 'app-profile-dashboard',
    templateUrl: './profile-account-settings.component.html',
    styleUrls: ['./profile-account-settings.component.css']
})
export class ProfileAccountSettingsComponent implements OnInit {
    public user;
    public updatedUser = {};
    public email: string;
    public company: string;
    public accountType;
    public individualAccount: boolean;
    public editUserName: boolean;
    public editEmail: boolean;
    public editAccountType: boolean;
    public saveEnabled = false;
    private token: string;
    private userId: string;

    constructor(
        public authService: AuthService,
        public appService: AppService,
        public profileService: ProfileService) {}

    ngOnInit(): void {
        this.authService.subject.subscribe(res => {
            this.user =  res['session']['user']['values'];
            this.token = res['session']['user']['token'];
            this.userId = res['session']['user']['id'];
            this.checkAccountType(this.user);
            this.updateUser();
        });
        this.authService.getLocalStorage();
    }

    checkAccountType(user: object): void {
        if (user['field_22'] === 'admin') {
            this.accountType = 'Business Admin';
            this.individualAccount = false;
        } else {
            this.accountType = 'Individual';
            this.individualAccount = true;
        }
    }

    editField(field: string): void {
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

    enableSave(): void {
        this.saveEnabled = true;
    }

    cancel(): void {
        this.saveEnabled = true;
        this.editUserName = false;
        this.editEmail = false;
        this.editAccountType = false;
    }

    updateUser(): void {
        this.updatedUser['field_19'] = {};
        this.updatedUser['field_19']['email'] = this.user['field_19']['email'];
        this.updatedUser['field_50'] = this.user['field_50'];
        if (this.individualAccount) {
            this.updatedUser['field_22'] = 'individual';
        } else {
            this.updatedUser['field_22'] = 'admin';
        }
    }

    submitUpdate(): void {
        if (this.individualAccount) {
            this.updatedUser['field_22'] = 'individual';
        } else {
            this.updatedUser['field_22'] = 'admin';
        }
        this.profileService.updateAccountSettings(this.updatedUser, this.token, this.userId).subscribe(() => {
            if (!this.authService.errorResponse) {
                this.editUserName = false;
                this.editEmail = false;
                this.editAccountType = false;
                this.saveEnabled = false;
                this.checkAccountType(this.user);
                this.flashSuccess();
            }
        });
    }

    flashSuccess(): void {
        const app = this;
        app.authService.formSuccess = true;
        setTimeout(function () {
            app.authService.formSuccess = false;
        }, 3000);
    }
}
