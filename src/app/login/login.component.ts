import {Component, OnInit} from '@angular/core';

import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { AppService } from '../app.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(
        private authService: AuthService,
        private loginService: LoginService,
        public appService: AppService) {}

    ngOnInit(): void {
        this.authService.postLogin();
    }

    login(): void {
        this.loginService.login(this.email, this.password);
    }

    logout(): void {
        this.authService.logout();
    }
}
