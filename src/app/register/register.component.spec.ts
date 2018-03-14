import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { AuthService } from '../auth.service';
import { AppService } from '../app.service';

const fakeRoute = {};

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            imports: [ FormsModule, HttpClientTestingModule ],
            providers: [ RegisterService, AuthService, AppService,
                { provide: Router, useValue: fakeRoute },
                { provide: ActivatedRoute, useValue: fakeRoute }
                ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
