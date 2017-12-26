import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompaniesService} from './companies/companies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule ],
            providers: [ CompaniesService ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.ngOnInit();
        expect(app).toBeTruthy();
    }));

    it('should return activated route data', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const outlet = {activatedRouteData: { page: 1}};
        expect(app.getPage(outlet)).toBe(1);
    }));
});

