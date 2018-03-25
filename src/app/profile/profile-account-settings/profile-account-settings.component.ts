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
    public accountType = 'Individual';
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
            this.accountType = 'Business';
        }
    }

    editField(field) {
        if (field === 'userName') {
            this.editUserName = true;
        }

        if (field === 'email') {
            this.editUserName = true;
        }

        if (field === 'accountType') {
            this.editUserName = true;
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
        //this.updatedUser['field_19'] = this.email;
        this.updatedUser['field_50'] = this.userName;
        //this.updatedUser['field_22'] = this.accountType;
    }

    submitUpdate() {
        this.updateUser();
        this.profileService.updateAccountSettings(this.updatedUser, this.user['user']['token']).subscribe();
        this.editUserName = false;
        this.editEmail = false;
        this.editAccountType = false;
    }
}
