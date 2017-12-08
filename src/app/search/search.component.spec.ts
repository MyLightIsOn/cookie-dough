import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import {Component, EventEmitter, Input, Output, DebugElement} from '@angular/core';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';
import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-search-results',
    template: '<p>Mock App Search Results Component</p>'
})
class MockSearchResultsComponent {
    @Input() companies$;
    @Input() company: ICompany;
    @Input() searchSubmitted;
    @Output() companiesReset = new EventEmitter();
}

const mockCompanyObservable = {
    'companies' : {
        'records' : [1, 2, 3]
    }
};

const mockCompanyService = {
    companyDataObservable: {},
};

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent, MockSearchResultsComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService,
                { provide: CompaniesService, useValue: mockCompanyService }
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should call subscribeToCompanyData when created', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app, 'subscribeToCompanyData');

        app.ngOnInit();
        expect(app.subscribeToCompanyData).toHaveBeenCalled();
    }));

    it('searchStart should set searchStarted to true', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app, 'subscribeToCompanyData');

        app.searchStart();
        expect(app.searchStarted).toBeTruthy();
    }));

    it('searchSubmit should set searchSubmitted to true', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app, 'subscribeToCompanyData');

        app.searchSubmit();
        expect(app.searchSubmitted).toBeTruthy();
    }));

    describe('Calling companyReset', () => {
        beforeEach(async(inject([CompaniesService], (companyService: CompaniesService) => {
            companyService.companyDataObservable = Observable.of(mockCompanyObservable);
        }))
        );

        it('it should set searchSubmitted Value to False', async(() => {
            const fixture = TestBed.createComponent(SearchComponent);
            const app = fixture.debugElement.componentInstance;

            app.searchSubmitted = true;

            app.companiesReset();
            expect(app.searchSubmitted).toBeFalsy();
        }));

        it('companyReset should clear the search box when called', async(() => {
            const fixture = TestBed.createComponent(SearchComponent);
            const app = fixture.debugElement.componentInstance;

            let de:      DebugElement;
            let el:      HTMLInputElement;


            de = fixture.debugElement.query(By.css('input'));
            el = de.nativeElement;
            el.value = 'company name';
            app.companiesReset();
            expect(el.value).toBe('');
        }));

        it('it should call subscribeToCompanyData when called', async(() => {
            const fixture = TestBed.createComponent(SearchComponent);
            const app = fixture.debugElement.componentInstance;
            spyOn(app, 'subscribeToCompanyData');

            app.companiesReset();
            expect(app.subscribeToCompanyData).toHaveBeenCalled();
        }));
    });
});
