import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessagesService {

    constructor() { }

    public error: boolean;
    public success: boolean;
    public messages: string[];
    public field: string;
    public waiting: boolean

    // fields errors
    public field_50: boolean; // username
    public field_19: boolean; // email
    public field_20: boolean; // password
    public field_22: boolean; // account type
    public passwordConfirm: boolean; // password confirm

    // Allows the user to close the error
    public closeError(): void {
        this.error = false;
    }

    // Creates error messages based on the argument
    public createErrorMessage(errorType: any): void {
        this.waiting = false;
        this.error = true;
        this.messages = [];

        // Turns the errorType to an array for the map function
        if (typeof errorType === 'string') {
            errorType = [errorType];
        }

        // Iterates over each error and adding it to the messages array
        errorType.map(error => {
            if (error.message) {
                this.messages.push(error.message);
            } else {
                switch (errorType[0]) {

                    // Sending a search without entering any keywords.
                    case 'blank search':
                        this.messages.push('Please enter keywords to search');
                        break;

                    // Passwords do not match
                    case 'confirm passwords':
                        this.messages.push('Please make sure your passwords match');
                }
            }

            // Checks the fields returning an error and highlights them
            if (error.field) {
                const fieldName = error.field;
                this[fieldName] = true;
            }
        });
    }

    // Creates a message for successful actions
    public createSuccessMessage(successType: string): void {
        this.waiting = false;
        this.success = true;
        this.messages = [];

        switch ([successType][0]) {
            // Successful registration.
            case 'registration':
                this.messages.push('Registration is successful');
                break;
        }

        const flashMessageService = this;

        // Removes the success message after a time
        setTimeout(function () {
            flashMessageService.success = false;
        }, 3000);
    }
}
