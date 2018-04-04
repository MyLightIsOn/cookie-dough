import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterVerifyComponent } from './register-verify.component';
import { RegisterService } from '../register.service';
import { AuthService } from '../../auth.service';
import { LoginService } from '../../login/login.service';
import { AppService } from '../../app.service';


import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from '../../flash-messages.service';

const fakeActivatedRoute = {
    params: Observable.of({id: '123'})
};

const fakeRoute = {};

describe('RegisterVerifyComponent', () => {
    let component: RegisterVerifyComponent;
    let fixture: ComponentFixture<RegisterVerifyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterVerifyComponent ],
            imports: [ FormsModule, HttpClientTestingModule ],
            providers: [ RegisterService, AuthService, LoginService, AppService, FlashMessagesService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: Router, useValue: fakeRoute}
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterVerifyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
