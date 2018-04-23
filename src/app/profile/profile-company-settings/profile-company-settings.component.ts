import { Component, OnInit } from '@angular/core';

import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth.service';
import { AppService } from '../../app.service';
import { FlashMessagesService } from '../../flash-messages.service';

import { ICompany } from '../../_interfaces/companies';
import * as countries from '../../json/countries.json';

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
    public companyDescriptionEdit: boolean;
    public companyTaglineEdit: boolean;
    public companyEstablishedDateEdit: boolean;
    public companyWebsiteEdit: boolean;
    public companyEmail_1_Edit: boolean;
    public companyEmail_2_Edit: boolean;
    public companyPhone_1_Edit: boolean;
    public companyPhone_1_CountryCode: string;
    public companyPhone_1_Number: string;
    public companyPhone_2_Edit: boolean;
    public companyPhone_2_CountryCode: string;
    public companyPhone_2_Number: string;
    public companySocial_1_Edit: boolean;
    public companySocial_2_Edit: boolean;
    public companySocial_3_Edit: boolean;
    public companyHoursEdit = true;
    public countries = countries[0];
    public time;
    public searchCountryText: string;
    public token: string;
    public userId: string;
    public fileToUpload: any;
    public openDropdown: boolean;
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
            this.formatBusinessHours(this.company['field_15']);
            this.formatPhoneField('field_10', 1);
            this.formatPhoneField('field_11', 2);
        });
        this.authService.getLocalStorage();
    }

    formatBusinessHours(field) {
        if (field) {
            this.time = JSON.parse(field);
            console.log(this.time);
        }
    }

    formatPhoneField(field, number) {
        const countryCode = 'companyPhone_' + number.toString() + '_CountryCode';
        const phoneNumber = 'companyPhone_' + number.toString() + '_Number';
        this[countryCode] = this.company[field + '_raw']['full']
            .split('+')[1]
            .substr(0, this.company['field_10_raw']['full'].indexOf(' '));
        this[phoneNumber] = this.company['field_10_raw']['full'].split(' ')[1];
        this.company[field] = '+' + this[countryCode] + ' ' + this[phoneNumber];
    }

    editField(fieldName, field?, object?): void {
        const fieldToEdit = fieldName + 'Edit';
        const updatedField = field.replace('_raw', '');
        if (object) {
            this.updatedCompany[updatedField] = this.company[field][object];
        } else {
            this.updatedCompany[updatedField] = this.company[field];
        }
        this.editedFields.push(fieldToEdit);
        this[fieldToEdit] = true;
        this.enableSave();
    }

    countryTypeHead(): void {
        const filteredCountriesLength = this.profileService.filteredCountries.length;
        this.searchCountryText = this.updatedCompany['field_2']['country'];

        if (this.searchCountryText.length > 1 && filteredCountriesLength > 0) {
            this.openDropdown = true;
        } else {
            this.openDropdown = false;
        }
    }

    setCountryValue(countryName: string): void {
        this.updatedCompany['field_2']['country'] = countryName;
        this.openDropdown = false;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    enableSave(): void {
        this.saveEnabled = true;
    }

    toggleSwitch(toggle: boolean): void {
        toggle['open'] = !toggle['open'];
    }

    submitUpdate(): void {
        if (this.fileToUpload) {
            this.profileService.uploadImage(this.fileToUpload).subscribe( res => {
                this.profileService.updateCompanySettings(this.updatedCompany, this.company.id, res).subscribe();
                if (!this.flashMessageService.error) {
                    this.closeEditFields();
                }
            });
        } else {
            this.profileService.updateCompanySettings(this.updatedCompany, this.company.id).subscribe(() => {
                if (!this.flashMessageService.error) {
                    this.closeEditFields();
                }
            });
        }
    }

    closeEditFields(): void {
        for (const fields of Object.keys(this.editedFields)) {
            const fieldToClose = this.editedFields[fields];
            this[fieldToClose] = false;
        }
        this.saveEnabled = false;
        this.editedFields = [];
    }

    cancel(): void {
        this.closeEditFields();
    }
}
