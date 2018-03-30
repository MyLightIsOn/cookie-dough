import {TestBed, async, inject} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { CompaniesService} from './companies/companies.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockSession = {
    session: {
        user: {
            id: '1234',
            token: '4321',
            values: {
                field_19: {
                    email: 'lawrence2978@email.com'
                },
                field_34: ['111111111'],
                field_50: 'lawrence',
                field_51: 'company'
            }
        }
    }
};

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService, LoginService, AppService, AuthService ]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
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

    it('set the isLoggedIn service prop to true', async(inject([AuthService], (service: AuthService) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        service.isLoggedIn = false;

        service.setLocalStorage(mockSession);
        app.ngOnInit();
        expect(service.isLoggedIn).toBe(true);
    })));

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
        service.searchStarted = true;
        service.showNav();

        expect(service.searchStarted).toBeFalsy();

        service.searchStarted = false;
        service.hideNav();

        expect(service.searchStarted).toBeTruthy();
    }));

    it('should hide the nav when searching', inject([AppService], (service: AppService) => {

        service.device = 'mobile';
        spyOn(service, 'hideNav');
        service.fieldFocus();

        expect(service.hideNav).toHaveBeenCalled();
    }));

    it('should hide the nav when searching', inject([AppService], (service: AppService) => {
        spyOn(service, 'hideNav');
        service.device = 'desktop';
        service.fieldFocus();
        expect(service.hideNav).toHaveBeenCalledTimes(0);
    }));

    it('should set the device to mobile', inject([AppService], (service: AppService) => {
        service.screenWidth = 1;
        service.getScreenSize();
        expect(service.device).toBe('mobile');
    }));

    it('should set the device to desktop', inject([AppService], (service: AppService) => {
        service.screenWidth = 1200;
        service.getScreenSize();
        expect(service.device).toBe('desktop');
    }));

    it('should toggle the dropdown', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        app.listOpen = true;
        app.toggleDropdown();
        expect(app.listOpen).toBeFalsy();

        app.toggleDropdown();
        expect(app.listOpen).toBeTruthy();
    }));

    it('should toggle the mobile menu', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        app.mobileMenuOpen = false;

        app.openMobileMenu();
        expect(app.mobileMenuOpen).toBeTruthy();

        app.openMobileMenu();
        expect(app.mobileMenuOpen).toBeFalsy();
    }));
});

