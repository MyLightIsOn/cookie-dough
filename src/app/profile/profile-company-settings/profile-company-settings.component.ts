import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth.service';
import {AppService} from '../../app.service';
import {FlashMessagesService} from '../../flash-messages.service';
import {ICompany} from '../../_interfaces/companies';

@Component({
    selector: 'app-profile-company-settings',
    templateUrl: './profile-company-settings.component.html',
    styleUrls: [
        '../profile-account-settings/profile-account-settings.component.css',
        './profile-company-settings.component.css'
    ]
})
export class ProfileCompanySettingsComponent implements OnInit {
    public company: ICompany;
    public updatedCompany: object;
    public saveEnabled = false;
    public companyNameEdit: boolean;
    public companyAddressEdit: boolean;
    private editedFields = [];

    constructor(
        public authService: AuthService,
        public appService: AppService,
        public profileService: ProfileService,
        public flashMessageService: FlashMessagesService) {}

    ngOnInit(): void {
        this.authService.subject.subscribe(res => {
            this.company =  res['session']['company'];
        });
        this.authService.getLocalStorage();
    }

    editField(field): void {
        const fieldToEdit = field + 'Edit';
        this.editedFields.push(fieldToEdit);
        this[fieldToEdit] = true;
        this.enableSave();
    }

    enableSave(): void {
        this.saveEnabled = true;
    }

    submitUpdate(): void {

    }

    cancel(): void {

    }
}
