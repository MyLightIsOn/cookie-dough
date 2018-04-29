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
    public timeEdits = [];
    public unitEdits = [];
    public countries = countries;
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

    editBusinessDayHours(day): void {
        const fieldToEdit = 'company' + day['day'] + 'HoursEdit';
        if (this.updatedCompany['field_15'] === undefined) {
            this.updatedCompany['field_15'] = JSON.parse(this.company['field_15']);
        }

        this[fieldToEdit] = true;
        this.editedFields.push(fieldToEdit);
        this.enableSave();
    }

    editTime(day, unit, type): void {
        const fieldToEdit = day + type + unit + 'Edit';
        const editButton = day + type + unit + 'EditTimeButton';
        this[editButton] = true;
        this[fieldToEdit] = true;
        this.timeEdits.push(fieldToEdit);
        this.unitEdits.push(editButton);
    }

    editPeriod(period, type): void {
        const upperCaseType = type.charAt(0).toUpperCase() + type.slice(1);
        const editButton = period['day'] + upperCaseType + 'PeriodEditTimeButton';
        this[editButton] = true;
        this.unitEdits.push(editButton);
        if (period[type]['period'] === 'am') {
            period[type]['period'] = 'pm';
        } else {
            period[type]['period'] = 'am';
        }
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

    stringifyTimes() {
        if (this.updatedCompany['field_15']) {
            const timeObj = this.updatedCompany['field_15'];
            this.updatedCompany['field_15'] = JSON.stringify(timeObj);
        }
    }

    submitUpdate(): void {
        this.stringifyTimes();
        if (this.fileToUpload) {
            this.profileService.uploadImage(this.fileToUpload).subscribe(
                res => {
                this.profileService.updateCompanySettings(this.updatedCompany, this.company.id, res).subscribe();
            },
                () => {},
                () => {
                if (!this.flashMessageService.error) {
                    this.cancel();
                }
            });
        } else {
            this.profileService.updateCompanySettings(this.updatedCompany, this.company.id).subscribe(
                () => {},
                () => {},
                () => {
                    if (!this.flashMessageService.error) {
                        this.cancel();
                    }
                });
        }
    }

    closeEditTime(): void {
        this.closeAllEditFields.apply(this, [this.timeEdits]);
    }

    closeAllEditFields(fields): void {
        for (const field of Object.keys(fields)) {
            const fieldToClose = fields[field];
            this[fieldToClose] = false;
        }
    }

    cancel(): void {
        this.saveEnabled = false;
        this.closeAllEditFields.apply(this, [this.editedFields, this.unitEdits, this.timeEdits]);
        this.editedFields = [];
        this.updatedCompany = {};
        this.ngOnInit();
    }
}
