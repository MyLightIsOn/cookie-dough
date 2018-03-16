import {TestBed, async, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { CompaniesService} from './companies/companies.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService, AuthService, LoginService, AppService ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        expect(app).toBeTruthy();
    }));

    it('should return activated route data for desktop', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const outlet = {activatedRouteData: { page: 1}};
        app.screenSize = 'desktop';

        expect(app.getPage(outlet)).toBe(1);
    }));

    it('should return activated route data for mobile', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const outlet = {activatedRouteData: { page: 1}};

        expect(app.getPage(outlet)).toBe('mobile-1');
    }));

    it('set the isLoggedIn service prop to true', inject([AuthService], (service: AuthService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const session = {};
        service.setLocalStorage(session);
        app.ngOnInit();
        expect(service.isLoggedIn).toBe(true);
    }));

    it('should log the user out with the auth service', inject([AuthService], (service: AuthService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(service, 'logout');
        app.logout();
        expect(service.logout).toHaveBeenCalled();
    }));

    it('should log the user in by passing in email and password to the login service', inject([LoginService], (service: LoginService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.email = 'email';
        app.password = 'password';

        spyOn(service, 'login');
        app.login();

        expect(service.login).toHaveBeenCalledWith(app.email, app.password);
    }));

    it('should show and hide the nav accordingly', inject([AppService], (service: AppService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        service.searchStarted = true;
        service.showNav()

        expect(service.searchStarted).toBeFalsy();
    }));

    it('should hide the nav when searching', inject([AppService], (service: AppService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        service.device = 'mobile';
        spyOn(service, 'hideNav');
        service.fieldFocus();

        expect(service.hideNav).toHaveBeenCalled();
    }));
});

