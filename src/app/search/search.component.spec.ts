import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

import { SearchComponent } from './search.component';
import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companyObject'
})
export class MockPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}

@Pipe({
    name: 'filter'
})
export class MockFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}

@Component({
    selector: 'app-search-results',
    template: '<p>Mock App Search Results Component</p>'
})
class MockSearchResultsComponent {
    @Input() companies$;
    @Input() company: ICompany;
}

describe('SearchComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent, MockPipe, MockFilterPipe, MockSearchResultsComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService, MockPipe, MockFilterPipe ]
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