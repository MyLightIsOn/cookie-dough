import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth.service';
import { AppService } from '../../app.service';
import {ProfileAccountSettingsComponent} from './profile-account-settings.component';
import { Observable } from 'rxjs/Observable';

const fakeRoute = {};

describe('ProfileAccountSettingsComponent', () => {
    let component: ProfileAccountSettingsComponent;
    let fixture: ComponentFixture<ProfileAccountSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfileAccountSettingsComponent ],
            imports: [ FormsModule, HttpClientTestingModule ],
            providers: [ ProfileService, AuthService, AppService,
                { provide: Router, useValue: fakeRoute },
                { provide: ActivatedRoute, useValue: fakeRoute }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileAccountSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check the account type', () => {
        const adminUser = {
            field_22: 'admin'
        };

        const individualUser = {
            field_22: 'individual'
        };

        component.checkAccountType(adminUser);

        expect(component.accountType).toBe('Business Admin');
        expect(component.individualAccount).toBeFalsy();

        component.checkAccountType(individualUser);
        expect(component.accountType).toBe('Individual');
        expect(component.individualAccount).toBeTruthy();
    });

    it('should make a field editable', () => {
        spyOn(component, 'enableSave');

        component.editField('userName');
        expect(component.editUserName).toBeTruthy();

        component.editField('email');
        expect(component.editEmail).toBeTruthy();

        component.editField('accountType');
        expect(component.editAccountType).toBeTruthy();

        expect(component.enableSave).toHaveBeenCalled();
    });

    it('should enable the save button', () => {
        component.enableSave();

        expect(component.saveEnabled).toBeTruthy();
    });

    it('should cancel the edits', () => {
        component.cancel();

        expect(component.saveEnabled).toBeTruthy();
        expect(component.editUserName).toBeFalsy();
        expect(component.editEmail).toBeFalsy();
        expect(component.editAccountType).toBeFalsy();
    });

    it('should cancel the edits', () => {
        const user = {
            field_19: {
                email: 'test@email.com'
            },
            field_50: 'test',
            field_22: 'individual'
        };

        component.user = user;
        component.individualAccount = false;
        component.updateUser();
        expect(component.updatedUser['field_22']).toEqual('admin');
    });

    it('should check the account type before submitting', () => {
        const user = {
            field_19: {
                email: 'test@email.com'
            },
            field_50: 'test',
            field_22: 'individual'
        };

        component.user = user;
        component.individualAccount = false;
        component.submitUpdate();
        expect(component.updatedUser['field_22']).toEqual('admin');

        component.individualAccount = true;
        component.updateUser();
        component.submitUpdate();
        expect(component.updatedUser['field_22']).toEqual('individual');
    });

    it('should flash the success message', inject([AuthService], (service: AuthService) => {
        component.flashSuccess();

        expect(service.formSuccess).toBeTruthy();
    }));

    it('should make fields not editable after success', async(inject(
        [ProfileService, AuthService], (service: ProfileService, authService: AuthService) => {
            authService.errorResponse = false;
            spyOn(service, 'updateAccountSettings').and.returnValue(Observable.of('some value'));
            component.editUserName = true;
            component.editEmail = true;
            component.editAccountType = true;

            component.submitUpdate();
            expect(component.editUserName).toBeFalsy();
            expect(component.editEmail).toBeFalsy();
            expect(component.editAccountType).toBeFalsy();
        })));

    it('should keep fields editable after an error', async(inject(
        [ProfileService, AuthService], (service: ProfileService, authService: AuthService) => {
            authService.errorResponse = true;
            spyOn(service, 'updateAccountSettings').and.returnValue(Observable.of('some value'));
            component.editUserName = true;
            component.editEmail = true;
            component.editAccountType = true;

            component.submitUpdate();
            expect(component.editUserName).toBeTruthy();
            expect(component.editEmail).toBeTruthy();
            expect(component.editAccountType).toBeTruthy();
        })));
});
