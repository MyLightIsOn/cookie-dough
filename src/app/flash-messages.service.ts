import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessagesService {

    constructor() { }

    public error: boolean;
    public success: boolean;
    public message: string;

    public closeError(): void {
        this.error = false;
    }

    public createErrorMessage(errorType: string): void {
        switch (errorType) {
            case 'blank search':
                errorType = 'Please enter keywords to search';
                break;

            case 'blank searchs':
                errorType = 'Enter some damn words!';
                break;
        }
        this.message = errorType;
    }

    public createSuccessMessage(successType: string): void {
        this.message = successType;
    }
}
