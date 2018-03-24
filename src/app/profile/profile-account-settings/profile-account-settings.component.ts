import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {AuthGuard} from '../../_guards/auth-guard.service';

@Component({
    selector: 'app-profile-dashboard',
    templateUrl: './profile-account-settings.component.html',
    styleUrls: ['./profile-account-settings.component.css']
})
export class ProfileAccountSettingsComponent implements OnInit{
    public user: object;
    public email: string;
    public company: string;
    public accountType = 'Individual';
    public userName: string;

    constructor(public authGuard: AuthGuard, public authService: AuthService) {}

    ngOnInit() {
        this.user = this.authGuard.getSession();
        this.email = this.user['user']['values']['field_19']['email'];
        this.userName = this.user['user']['values']['field_50'];
        if (this.user['user']['values']['field_51']) {
            this.company = this.user['user']['values']['field_51'];
            this.accountType = 'Business';
        }
    }
}
