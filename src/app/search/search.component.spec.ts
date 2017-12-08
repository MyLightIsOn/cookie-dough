import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import { SearchComponent } from './search.component';
import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';

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

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent, MockSearchResultsComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService ]
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
});