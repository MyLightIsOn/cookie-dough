import { TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlashMessagesService } from './flash-messages.service';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment} from '../environments/environment';

const router = {
    navigate: jasmine.createSpy('navigate')
};

const mockSessionWithCompany = {
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
        },
        company: {}
    }
};

const mockSessionNoCopmany = {
    session: {
        user: {
            id: '1234',
            token: '4321',
            values: {
                field_19: {
                    email: 'old@email.com'
                },
                field_50: 'lawrence',
                field_51: 'company'
            }
        },
        company: {}
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
            error: {
                errors: [
                    {
                        message: 'test'
                    }
                ]
            }
        };
        spyOn(flashMessageService, 'createErrorMessage');

        service.checkResponse(response);

        expect(flashMessageService.createErrorMessage).toHaveBeenCalledWith(response['error']['errors']);
        expect(service.isLoggedIn).toBeFalsy();
    }));

    it('should be return an successful response', inject([
        AuthService, FlashMessagesService], (service: AuthService, flashMessageService: FlashMessagesService) => {
        spyOn(service, 'postLogin');
        service.checkResponse(mockSessionWithCompany);

        expect(service.postLogin).toHaveBeenCalled();
        expect(flashMessageService.generalField).toBeFalsy();
        expect(flashMessageService.error).toBeFalsy();
        expect(flashMessageService.waiting).toBeFalsy();
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

            service.login('foo', 'bar').subscribe(() => {
                expect(service.checkResponse).toHaveBeenCalledWith(mockSessionWithCompany);
            });

            const req = backend.expectOne({method: 'POST'}, environment['BASEURL'] + '/login');
            expect(req.request.method).toEqual('POST');
            req.flush(mockSessionWithCompany);

            afterEach(() => {
                backend.verify();
            });
        }))
    );

    it('should set and get the local storage', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSessionWithCompany);

        spyOn(service.subject, 'next');

        service.getLocalStorage();
        expect(service.isLoggedIn).toBeTruthy();
        expect(service.subject.next).toHaveBeenCalled();
    }));

    it('should update the local storage', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSessionWithCompany);

        service.updateLocalStorage(userUpdate);
        const updatedUser = JSON.parse(localStorage.getItem('currentUser'));


        const oldUserName = mockSessionWithCompany['session']['user']['values']['field_50'];
        const newUserName = updatedUser['session']['user']['values']['field_50'];

        expect(oldUserName).not.toBe(newUserName);
        expect(newUserName).toBe('test');
    }));

    it('should remained logged out', inject([AuthService], (service: AuthService) => {
        service.setLocalStorage(mockSessionWithCompany);
        localStorage.clear();

        service.getLocalStorage();
        expect(service.isLoggedIn).toBeFalsy();
    }));

    it('should set up the user as an admin', async(inject([AuthService, HttpTestingController],
        (service: AuthService, backend: HttpTestingController) => {

            const companyId = '111111111';

            spyOn(service, 'setLocalStorage');
            spyOn(service.subject, 'next');

            service.accountAdminCheck(mockSessionWithCompany).subscribe(() => {
                expect(service.session).toEqual(mockSessionWithCompany);
                expect(service.subject.next).toHaveBeenCalled();
                expect(service.setLocalStorage).toHaveBeenCalledWith(mockSessionWithCompany);
            });

            const req = backend.expectOne({method: 'GET'}, environment['BASEURL'] + '/api/company?id=' + companyId);
            expect(req.request.method).toEqual('GET');
            req.flush(mockSessionWithCompany);

            afterEach(() => {
                backend.verify();
            });
        }))
    );
    it('should set up the user as an individual', async(inject([AuthService], (service: AuthService) => {

            spyOn(service, 'setLocalStorage');
            spyOn(service.subject, 'next');

            service.accountAdminCheck(mockSessionNoCopmany).subscribe(() => {
                expect(service.subject.next).toHaveBeenCalled();
                expect(service.setLocalStorage).toHaveBeenCalledWith(mockSessionNoCopmany);
            });
        }))
    );

    it('should redirect the user', async(inject([AuthService], (service: AuthService) => {
            service.isLoggedIn = true;
            service.postLogin();
            expect(router.navigate).toHaveBeenCalled();

            service.isLoggedIn = false;
            service.postLogin();
        }))
    );
});
