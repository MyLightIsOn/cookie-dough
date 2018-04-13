import { Component, OnInit } from '@angular/core';

import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth.service';
import {AppService} from '../../app.service';
import {FlashMessagesService} from '../../flash-messages.service';
import { ICompany } from '../../_interfaces/companies';

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
    public updatedCompany = {};
    public saveEnabled = false;
    public companyNameEdit: boolean;
    public companyAddressEdit: boolean;
    public companyLogoEdit: boolean;
    public token: string;
    public userId: string;
    public fileToUpload: any;
    private editedFields = [];

    constructor(
        public authService: AuthService,
        public appService: AppService,
        public profileService: ProfileService,
        public flashMessageService: FlashMessagesService) {}

    ngOnInit(): void {
        this.authService.subject.subscribe(res => {
            this.token = res['session']['user']['token'];
            this.userId = res['session']['user']['id'];
            this.company =  res['session']['company'];
            this.updatedCompany = {};
            this.updatedCompany['field_2'] = res['session']['company']['field_2_raw'];
        });
        this.authService.getLocalStorage();
    }

    editField(field): void {
        const fieldToEdit = field + 'Edit';
        this.editedFields.push(fieldToEdit);
        this[fieldToEdit] = true;
        this.enableSave();
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    enableSave(): void {
        this.saveEnabled = true;
    }

    submitUpdate(): void {
        if (this.fileToUpload) {
            this.profileService.uploadImage(this.fileToUpload).subscribe( res => {
                this.profileService.updateCompanySettings(this.updatedCompany, this.company.id, res).subscribe();
                if (!this.flashMessageService.error) {
                    this.updateSuccess();
                }
            });
        } else {
            this.profileService.updateCompanySettings(this.updatedCompany, this.company.id).subscribe(() => {
                if (!this.flashMessageService.error) {
                    this.updateSuccess();
                }
            });
        }
    }

    updateSuccess() {
        this.companyAddressEdit = false;
        this.companyNameEdit = false;
        this.companyLogoEdit = false;
        this.saveEnabled = false;
    }

    cancel(): void {

    }
}
