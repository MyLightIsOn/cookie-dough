import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';

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
    private role = 'Individual';
    private individualRole: boolean;
    private noEmail: boolean;
    private noUsername: boolean;
    private passwordError: boolean;
    private user = {};
    private userEmail = {};

    constructor(
        private registerService: RegisterService,
        public appService: AppService,
        private authService: AuthService) { }


    // Sets the user role to Individual by default.
    ngOnInit() {
        this.individualRole = true;
    }

    // Takes the string from the form and sets the user role accordingly
    roleSelect(role: string) {
        if (role === 'individual') {
            this.individualRole = true;
            this.role = 'Individual';
        } else {
            this.individualRole = false;
            this.role = 'Business Owner';
        }
    }

    // Validates if the fields are correct and if so, builds the email object and submits the registration.
    submitRegistration() {
        // Username Check
        if (!this.username) {
            this.authService.errorMessage = 'Must choose a username';
            this.authService.errorResponse = true;
            this.noUsername = true;
            return false;
        }

        // Email Check
        if (!this.email) {
            this.authService.errorMessage = 'Must include an email';
            this.authService.errorResponse = true;
            this.noEmail = true;
            return false;
        }

        // Password Check
        if (!this.password) {
            this.authService.errorMessage = 'Must include a password';
            this.authService.errorResponse = true;
            this.passwordError = true;
            return false;
        }


        // Password Confirm check
        if (this.password !== this.passwordMatch) {
            this.passwordError = true;
            this.authService.errorMessage = 'Passwords do not match';
            this.authService.errorResponse = true;
            return false;
        }

        this.user['field_50'] = this.username;
        this.userEmail['email'] = this.email;
        this.user['field_19'] = this.userEmail;
        this.user['field_20'] = this.password;
        this.user['field_22'] = this.role;
        this.registerService.registerUser(this.user).subscribe();
    }
}
