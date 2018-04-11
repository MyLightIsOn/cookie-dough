import { TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import {FlashMessagesService} from '../flash-messages.service';

const router = {
    navigate: jasmine.createSpy('navigate')
};

const mockSession = {
    session: {
        user: {
            id: '1234',
            token: '4321',
            values: {
                field_22: {
                    email: 'old@email.com'
                },
                field_52: ['111111111'],
                field_44: 'lawrence',
                field_53: 'company'
            }
        }
    }
};

const userUpdate = {
    field_22: {
        email: 'new@email.com'
    },
    field_50: 'individual',
    field_44: 'test',
};

const mockError = {
    error: {
        errors: [
            { message: 'error' }
        ]
    }
};

describe('ProfileService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ProfileService, AuthService, FlashMessagesService,
                { provide: Router, useValue: router }
            ]
        });
    });

    it('should be created', inject([ProfileService], (service: ProfileService) => {
        expect(service).toBeTruthy();
    }));

    it(`should send a put request to the backend`, async(inject([ProfileService, HttpTestingController, AuthService, FlashMessagesService],
        (
            service: ProfileService,
            backend: HttpTestingController,
            authService: AuthService,
            flashService: FlashMessagesService
        ) => {
            spyOn(authService, 'updateLocalStorage');
            spyOn(flashService, 'createSuccessMessage');

            service.updateAccountSettings(userUpdate, '1234', '5678').subscribe(res => {
                expect(authService.updateLocalStorage).toHaveBeenCalledWith(userUpdate);
                expect(flashService.createSuccessMessage).toHaveBeenCalledWith('account update');
            });

            const req = backend.expectOne({method: 'PUT'}, environment['BASEURL'] + '/login');
            expect(req.request.method).toEqual('PUT');
            req.flush(mockSession);

            afterEach(() => {
                backend.verify();
            });
        }))
    );

    it(`should return an error`, async(inject([ProfileService, HttpTestingController, FlashMessagesService],
        (
            service: ProfileService,
            backend: HttpTestingController,
            flashService: FlashMessagesService) => {

            spyOn(flashService, 'createErrorMessage');

            service.updateAccountSettings(userUpdate, '1234', '5678').subscribe(res => {
                expect(flashService.createErrorMessage).toHaveBeenCalledWith(mockError['error']['errors']);
            });

            const req = backend.expectOne({method: 'PUT'}, environment['BASEURL'] + '/login');
            expect(req.request.method).toEqual('PUT');
            req.flush(mockError);

            afterEach(() => {
                backend.verify();
            });
        }))
    );
});
