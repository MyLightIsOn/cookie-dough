import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { AppService } from '../app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    email: string;
    password: string;

    constructor(
        public authService: AuthService,
        public loginService: LoginService,
        public appService: AppService) {}

    login() {
        this.loginService.login(this.email, this.password);
    }

    logout() {
        this.authService.logout();
    }
}
