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
            this.noEmail = true;
        } else {
            this.noEmail = false;
        }

        if (!this.password) {
            this.passwordError = true;
        }

        if (this.password !== this.passwordMatch) {
            this.passwordError = true;
            this.authService.errorMessage = 'Passwords do not match';
            this.authService.errorResponse = true;
            return false;
        }

        const user = {};
        const email = {};
        email['email'] = this.email;

        user['field_19'] = email;
        user['field_20'] = this.password;
        user['field_22'] = this.role;
        this.registerService.registerUser(user).subscribe();
    }
}
