import {TestBed, inject, async} from '@angular/core/testing';

import { FlashMessagesService } from './flash-messages.service';

describe('FlashMessagesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FlashMessagesService]
        });
    });

    it('should be created', inject([FlashMessagesService], (service: FlashMessagesService) => {
        expect(service).toBeTruthy();
    }));

    it('should close the error', inject([FlashMessagesService], (service: FlashMessagesService) => {
        service.closeError();
        expect(service.error).toBeFalsy();
    }));

    it('should create an error message based on an object', inject([FlashMessagesService], (service: FlashMessagesService) => {
        const mockErrorResponse = {
            errors: [
                {
                    message: 'error message',
                    field: 'field_22'
                }
            ]
        };

        service.createErrorMessage(mockErrorResponse['errors']);
        expect(service.messages[0]).toBe('error message');
        expect(service.error).toBeTruthy();
        expect(service.waiting).toBeFalsy();
        expect(service.field_22).toBeTruthy();
    }));

    it('should create an error message based on a string', inject([FlashMessagesService], (service: FlashMessagesService) => {

        service.createErrorMessage('blank search');
        expect(service.messages[0]).toBe('Please enter keywords to search');
        expect(service.error).toBeTruthy();
        expect(service.waiting).toBeFalsy();

        service.createErrorMessage('confirm passwords');
        expect(service.messages[0]).toBe('Please make sure your passwords match');
        expect(service.error).toBeTruthy();
        expect(service.waiting).toBeFalsy();
    }));

    it('should create an success message based on a string', async(inject([FlashMessagesService], (service: FlashMessagesService) => {

        service.createSuccessMessage('registration');
        expect(service.messages[0]).toBe('Registration is successful');
        expect(service.error).toBeFalsy();
        expect(service.waiting).toBeFalsy();

        service.createSuccessMessage('account update');
        expect(service.messages[0]).toBe('Account update is successful');
        expect(service.error).toBeFalsy();
        expect(service.waiting).toBeFalsy();

        setTimeout(function () {
            expect(service.success).toBeFalsy();
        }, 3000);
    })));
});
