import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../_guards/auth-guard.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    sessionId: Observable<string>;
    token: Observable<string>;
    user: object;
    firstName: string;
    email: string;

    constructor(private route: ActivatedRoute, public authGuard: AuthGuard) {}

    ngOnInit() {
        this.user = this.authGuard.getSession();
        this.email = this.user['user']['values']['email']['email'];
        /*// Capture the session ID if available
        this.sessionId = this.route
            .queryParamMap
            .map(params => params.get('session_id') || 'None');

        // Capture the fragment if available
        this.token = this.route
            .fragment
            .map(fragment => fragment || 'None');*/
    }

}
