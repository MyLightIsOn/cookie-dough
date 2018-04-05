import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { FlashMessagesService } from '../flash-messages.service';

const router = {
    navigate: jasmine.createSpy('navigate')
};

describe('RegisterService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ RegisterService, AuthService, FlashMessagesService,
                { provide: Router, useValue: router }
                ]
        });
    });

    it('should register a user', async(inject([
        RegisterService, HttpTestingController, FlashMessagesService],
        (registerService: RegisterService, backend: HttpTestingController, flashService: FlashMessagesService) => {

            const body = {
                email: 'test@email.com',
                password: '123'
            };
            spyOn(flashService, 'createSuccessMessage');

            registerService.registerUser(body).subscribe(() => {
                expect(registerService.registrationSuccess).toBeTruthy();
                expect(flashService.createSuccessMessage).toHaveBeenCalledWith('registration');
            });

            const req = backend.expectOne({method: 'POST'}, environment['BASEURL'] + '/api/register');
            expect(req.request.method).toEqual('POST');
            req.flush(body);

            afterEach(() => {
                backend.verify();
            });
        })
    ));

    it('should set an error when registering', async(inject([
            RegisterService, HttpTestingController, FlashMessagesService],
        (registerService: RegisterService, backend: HttpTestingController, flashService: FlashMessagesService) => {
            const body = {
                email: 'test@email.com',
                password: '123'
            };

            const mockErrorResponse = {
                error: {
                    errors: [
                        {
                            message: 'error message'
                        }
                    ]
                }
            };

            spyOn(flashService, 'createErrorMessage');
            registerService.registerUser(body).subscribe(() => {
                expect(registerService.registrationSuccess).toBeFalsy();
                expect(flashService.createErrorMessage).toHaveBeenCalledWith(mockErrorResponse['error']['errors']);
            });

            const req = backend.expectOne({method: 'POST'}, environment['BASEURL'] + '/api/register');

            req.flush(mockErrorResponse);
            afterEach(() => {
                backend.verify();
            });
        })
    ));

    it('should verify the user', async(inject([
            RegisterService, HttpTestingController, AuthService],
        (registerService: RegisterService, backend: HttpTestingController) => {
            const id = '123';

            registerService.verifiyUser(id).subscribe(res => {
                expect(registerService.accountVerified).toBeTruthy();
            });

            const req = backend.expectOne({method: 'PUT'},
                environment['BASEURL'] + '/api/verify?id=' + id );

            req.flush(id);
            afterEach(() => {
                backend.verify();
            });
        })
    ));

    it('should set an error when verifying', async(inject([
            RegisterService, HttpTestingController, FlashMessagesService],
        (registerService: RegisterService, backend: HttpTestingController, flashService: FlashMessagesService) => {
            const id = '123';

            const mockErrorResponse = {
                error: {
                    errors: [
                        {
                            message: 'error message'
                        }
                    ]
                }
            };

            spyOn(flashService, 'createErrorMessage');

            registerService.verifiyUser(id).subscribe(res => {
                expect(registerService.accountVerified).toBeFalsy();
                expect(flashService.createErrorMessage).toHaveBeenCalledWith(mockErrorResponse['error']['errors']);
            });

            const req = backend.expectOne({method: 'PUT'},
                environment['BASEURL'] + '/api/verify?id=' + id );

            req.flush(mockErrorResponse);
            afterEach(() => {
                backend.verify();
            });
        })
    ));
});
