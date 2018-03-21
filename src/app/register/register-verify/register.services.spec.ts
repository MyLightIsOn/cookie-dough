import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { Response, ResponseOptions, ResponseType, Request } from '@angular/http';
import { MockConnection } from '@angular/http/testing';

import { RegisterService } from '../register.service';
import { AuthService } from '../../auth.service';
import { environment } from '../../../environments/environment';

const router = {
    navigate: jasmine.createSpy('navigate')
};

describe('RegisterService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ RegisterService, AuthService,
                { provide: Router, useValue: router }
                ]
        });
    });

    it('should register a user', async(inject([
        RegisterService, HttpTestingController, AuthService],
        (registerService: RegisterService, backend: HttpTestingController, authService: AuthService) => {

            const body = {
                email: 'test@email.com',
                password: '123'
            };

            registerService.registerUser(body).subscribe(res => {
                expect(registerService.waiting).toBeFalsy();
                expect(registerService.registrationSuccess).toBeTruthy();
                expect(authService.errorResponse).toBeFalsy();
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
            RegisterService, HttpTestingController, AuthService],
        (registerService: RegisterService, backend: HttpTestingController, authService: AuthService) => {
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

            registerService.registerUser(body).subscribe(res => {
                expect(authService.errorMessage).toBe('error message');
                expect(authService.errorResponse).toBeTruthy();
                expect(registerService.registrationSuccess).toBeFalsy();
                expect(registerService.waiting).toBeFalsy();
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
                expect(registerService.waiting).toBeFalsy();
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
            RegisterService, HttpTestingController, AuthService],
        (registerService: RegisterService, backend: HttpTestingController, authService: AuthService) => {
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

            registerService.verifiyUser(id).subscribe(res => {
                expect(authService.errorMessage).toBe('error message');
                expect(authService.errorResponse).toBeTruthy();
                expect(registerService.accountVerified).toBeFalsy();
                expect(registerService.waiting).toBeFalsy();
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
