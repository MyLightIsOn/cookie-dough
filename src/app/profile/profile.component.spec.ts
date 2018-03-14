import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../_guards/auth-guard.service';
import { AuthService } from '../auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { ProfileComponent } from './profile.component';

const user = {
    user: {
        values: {
            name: {
                first: 'test'
            },
            email: {
                email: 'hi@email.com'
            }
        }
    }
};
const fakeActivatedRoute = {};
const fakeRoute = {};
const fakeAuthGuard = {
    getSession: function(){
        return user;
    }
};

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProfileComponent ],
            providers: [ AuthService,
                { provide: AuthGuard, useValue: fakeAuthGuard },
                { provide: Router, useValue: fakeRoute },
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
                ],
            imports: [ HttpClientTestingModule ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
