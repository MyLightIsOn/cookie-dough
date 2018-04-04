import { TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlashMessagesService } from './flash-messages.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment} from '../environments/environment';

const router = {
    navigate: jasmine.createSpy('navigate')
};

const mockSession = {
    session: {
        user: {
            id: '1234',
            token: '4321',
            values: {
                field_19: {
                    email: 'old@email.com'
                },
                field_34: ['111111111'],
                field_50: 'lawrence',
                field_51: 'company'
            }
        }
    }
};

const userUpdate = {
    field_19: {
        email: 'new@email.com'
    },
    field_22: 'individual',
    field_50: 'test',
};

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ FlashMessagesService, AuthService,
                { provide: Router, useValue: router }
                ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should be return an error response',
        inject([AuthService, FlashMessagesService], (service: AuthService, flashMessageService: FlashMessagesService) => {
        const response = {
            errors: [
                {
                    message: 'test'
                }
            ]
        };
        spyOn(flashMessageService, 'createErrorMessage');

        service.checkResponse(response);

        expect(flashMessageService.createErrorMessage).toHaveBeenCalledWith(response['errors']);
        expect(service.isLoggedIn).toBeFalsy();
    }));

    it('should be return an successful response', inject([AuthService], (service: AuthService) => {
        const response = {
            session: 'test'
        };
        spyOn(service, 'setLocalStorage');
        spyOn(service, 'getLocalStorage');
        service.checkResponse(response);

        expect(service.setLocalStorage).toHaveBeenCalledWith(response);
        expect(service.isLoggedIn).toBeTruthy();
    }));

    it('should log the user out', inject([AuthService], (service: AuthService) => {
        service.logout();
        const user = localStorage.getItem('currentUser');

        expect(service.isLoggedIn).toBeFalsy();
        expect(user).toBe(null);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));

    it('should send an expected login request', async(inject([AuthService, HttpTestingController],
        (service: AuthService, backend: HttpTestingController) => {
            spyOn(service, 'checkResponse');

            service.login('foo', 'bar').subscribe(res => {
                expect(service.session).toBe(mockSession);
                expect(service.checkResponse).toHaveBeenCalledWith(mockSession);
            });

            const req = backend.expectOne({method: 'POST'}, environment['BASEURL'] + '/login');
            expect(req.request.method).toEqual('POST');
            req.flush(mockSession);

            afterEach(() => {
                backend.verify();
            });
        }))
    );

    it('should set and get the local storage', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSession);

        spyOn(service.subject, 'next');

        service.getLocalStorage();
        expect(service.isLoggedIn).toBeTruthy();
        expect(service.subject.next).toHaveBeenCalled();
    }));

    it('should update the local storage', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSession);

        service.updateLocalStorage(userUpdate);
        const updatedUser = JSON.parse(localStorage.getItem('currentUser'));


        const oldUserName = mockSession['session']['user']['values']['field_50'];
        const newUserName = updatedUser['session']['user']['values']['field_50'];

        expect(oldUserName).not.toBe(newUserName);
        expect(newUserName).toBe('test');
    }));

    it('should remained logged out', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSession);
        localStorage.clear();

        service.getLocalStorage();
        expect(service.isLoggedIn).toBeFalsy();
    }));
});
