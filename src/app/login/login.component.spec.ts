import {TestBed, async, inject} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AppService } from '../app.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import {AppComponent} from '../app.component';
import {Observable} from 'rxjs/Observable';

const fakeAuthService = {
    login: () => {},
    checkResponse: {},
    setLocalStorage: {},
    logout: jasmine.createSpy('logout')
};

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule ],
            declarations: [ LoginComponent ],
            providers: [ LoginService, AppService,
                { provide: AuthService, useValue: fakeAuthService }]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should call the login method from login service', inject([LoginService], (service: LoginService) => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(service, 'login');
        app.email = 'email';
        app.password = 'password';
        app.login();
        expect(service.login).toHaveBeenCalledWith('email', 'password');
    }));

    it('should call the logout method from auth service', inject([AuthService], (service: AuthService) => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;

        app.logout();
        expect(service.logout).toHaveBeenCalled();
    }));

    it('should call the login method from login service',
        inject([LoginService, AuthService], (loginService: LoginService, authService: AuthService) => {
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        authService.isLoggedIn = true;
        spyOn(authService, 'login').and.returnValue({ subscribe: () => {} });
        app.email = 'email';
        app.password = 'password';
        app.login();
        expect(authService.login).toHaveBeenCalledWith('email', 'password');
    }));
});

