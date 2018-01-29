import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    sessionId: Observable<string>;
    token: Observable<string>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
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
