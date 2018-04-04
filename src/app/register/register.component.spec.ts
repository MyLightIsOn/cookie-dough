import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';
import { AppService } from '../app.service';
import {FlashMessagesService} from '../flash-messages.service';

const fakeRoute = {};

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            imports: [ FormsModule, HttpClientTestingModule ],
            providers: [ RegisterService, AuthService, AppService, FlashMessagesService,
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
        component['individualRole'] = false;
        component.roleSelect('individual');

        expect(component['individualRole']).toBeTruthy();
        expect(component['accountType']).toBe('Individual');

        component.roleSelect('business');
        expect(component['individualRole']).toBeFalsy();
        expect(component['accountType']).toBe('Business Owner');
    });

    it('should tell the user that passwords need to match',  inject([FlashMessagesService], (flashService: FlashMessagesService) => {
        component.username = 'test user';
        component.email = 'test';
        component.password = '123';
        component.passwordMatch = '456';

        spyOn(flashService, 'createErrorMessage');

        component.submitRegistration();
        expect(flashService.passwordConfirm).toBeTruthy();
        expect(flashService.field_20).toBeTruthy();
        expect(flashService.createErrorMessage).toHaveBeenCalledWith('confirm passwords');
    }));

    it('should set the user object',  inject([AuthService], (authService: AuthService) => {
        component.username = 'test user';
        component.email = 'test';
        component.password = '123';
        component.passwordMatch = '123';
        component['individualRole'] = true;

        component.submitRegistration();

        expect(component['user']['field_50']).toBe('test user');
        expect(component['user']['field_19']['email']).toBe('test');
        expect(component['user']['field_20']).toBe('123');
        expect(component['user']['field_22']).toBe('Individual');
        expect(component['accountType']).toBe('Individual');
    }));
});
