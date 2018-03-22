import { TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment} from '../environments/environment';

const router = {
    navigate: jasmine.createSpy('navigate')
};

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ AuthService,
                { provide: Router, useValue: router }
                ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should be return an error response', inject([AuthService], (service: AuthService) => {
        const response = {
            error : {
                errors: [
                    {
                        message: 'test'
                    }
                ]
            }
        };
        service.checkResponse(response);

        expect(service.errorResponse).toBeTruthy();
        expect(service.errorMessage).toBe('test');
        expect(service.isLoggedIn).toBeFalsy();
    }));

    it('should be return an successful response', inject([AuthService], (service: AuthService) => {
        const response = {
            session: 'test'
        };
        service.checkResponse(response);

        expect(service.session).toBe(response['session']);
        expect(service.isLoggedIn).toBeTruthy();
    }));

    it('should log the user out', inject([AuthService], (service: AuthService) => {
        service.logout();
        const user = localStorage.getItem('currentUser');

        expect(service.isLoggedIn).toBeFalsy();
        expect(user).toBe(null);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

    it(`should send an expected login request`, async(inject([AuthService, HttpTestingController],
        (service: AuthService, backend: HttpTestingController) => {
            service.login('foo', 'bar').subscribe();

            const req = backend.expectOne({method: 'POST'}, environment['BASEURL'] + '/login');
            expect(req.request.method).toEqual('POST');
        })));
});
