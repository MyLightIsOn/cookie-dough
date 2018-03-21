import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';
import { AppService } from '../app.service';

const fakeRoute = {};

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            imports: [ FormsModule, HttpClientTestingModule ],
            providers: [ RegisterService, AuthService, AppService,
                { provide: Router, useValue: fakeRoute },
                { provide: ActivatedRoute, useValue: fakeRoute }
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the role', () => {
        component.individualRole = false;
        component.roleSelect('individual');

        expect(component.individualRole).toBeTruthy();
        expect(component.role).toBe('Individual');

        component.roleSelect('business');
        expect(component.individualRole).toBeFalsy();
        expect(component.role).toBe('Business Owner');
    });

    it('should tell the user to include an email',  inject([AuthService], (authService: AuthService) => {
        component.email = undefined;

        component.submitRegistration();
        expect(authService.errorMessage).toBe('Must include an email');
        expect(authService.errorResponse).toBeTruthy();
        expect(component.noEmail).toBeTruthy();
    }));

    it('should tell the user to include a password',  inject([AuthService], (authService: AuthService) => {
        component.email = 'test';
        component.password = undefined;

        component.submitRegistration();
        expect(authService.errorMessage).toBe('Must include a password');
        expect(authService.errorResponse).toBeTruthy();
        expect(component.passwordError).toBeTruthy();
    }));

    it('should tell the user that passwords need to match',  inject([AuthService], (authService: AuthService) => {
        component.email = 'test';
        component.password = '123';
        component.passwordMatch = '456';

        component.submitRegistration();
        expect(authService.errorMessage).toBe('Passwords do not match');
        expect(authService.errorResponse).toBeTruthy();
        expect(component.passwordError).toBeTruthy();
    }));

    it('should set the user object',  inject([AuthService], (authService: AuthService) => {
        component.email = 'test';
        component.password = '123';
        component.passwordMatch = '123';
        component.individualRole = true;

        component.submitRegistration();

        expect(component.user['field_19']['email']).toBe('test');
        expect(component.user['field_20']).toBe('123');
        expect(component.user['field_22']).toBe('Individual');
        expect(component.role).toBe('Individual');
    }));
});
