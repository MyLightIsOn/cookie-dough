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
    public email;
    public password;
    public passwordMatch;
    public role = 'Individual';
    public individualRole: boolean;
    public noEmail;
    public passwordError;
    public user = {};
    public userEmail = {};

    constructor(
        public registerService: RegisterService,
        public appService: AppService,
        public authService: AuthService) { }

    ngOnInit() {
      this.individualRole = true;
    }

    roleSelect(role) {
      if (role === 'individual') {
          this.individualRole = true;
          this.role = 'Individual';
      } else {
          this.individualRole = false;
          this.role = 'Business Owner';
      }
    }

    submitRegistration() {
        if (!this.email) {
            this.authService.errorMessage = 'Must include an email';
            this.authService.errorResponse = true;
            this.noEmail = true;
            return false;
        }

        if (!this.password) {
            this.authService.errorMessage = 'Must include a password';
            this.authService.errorResponse = true;
            this.passwordError = true;
            return false;
        }

        if (this.password !== this.passwordMatch) {
            this.passwordError = true;
            this.authService.errorMessage = 'Passwords do not match';
            this.authService.errorResponse = true;
            return false;
        }

        this.userEmail['email'] = this.email;

        this.user['field_19'] = this.userEmail;
        this.user['field_20'] = this.password;
        this.user['field_22'] = this.role;
        this.registerService.registerUser(this.user).subscribe();
    }
}
