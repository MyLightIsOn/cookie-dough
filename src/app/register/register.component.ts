import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { AppService } from '../app.service';
import { FlashMessagesService } from '../flash-messages.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public username: string;
    public email: string;
    public password: string;
    public passwordMatch: string;
    private accountType = 'Individual';
    private individualRole: boolean;
    private user = {};
    private userEmail = {};

    constructor(
        public registerService: RegisterService,
        public appService: AppService,
        public flashMessageService: FlashMessagesService
    ) { }


    // Sets the user role to Individual by default.
    ngOnInit(): void {
        this.individualRole = true;
    }

    // Takes the string from the form and sets the user role accordingly
    roleSelect(role: string): void {
        if (role === 'individual') {
            this.individualRole = true;
            this.accountType = 'Individual';
        } else {
            this.individualRole = false;
            this.accountType = 'Business Owner';
        }
    }

    // Validates if the fields are correct and if so, builds the email object and submits the registration.
    submitRegistration(): void {
        if (this.password !== this.passwordMatch) {
            this.flashMessageService.createErrorMessage('confirm passwords');
            this.flashMessageService.field_20 = true;
            this.flashMessageService.passwordConfirm = true;
        } else {
            this.user['field_50'] = this.username;
            this.userEmail['email'] = this.email;
            this.user['field_19'] = this.userEmail;
            this.user['field_20'] = this.password;
            this.user['field_22'] = this.accountType;
            this.registerService.registerUser(this.user).subscribe();
        }
    }
}
