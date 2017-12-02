import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';
import { XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Component, Input } from '@angular/core';

import { SearchComponent } from './search.component';
import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';
import { environment} from '../../environments/environment';


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

    transform(items: any, term: any): any {
        if (term === undefined) { return items; }

        return items.filter(function(item) {
            for (const property in item) {
                if (item[property] === null) {
                    continue;
                }
                if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
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
            providers: [ CompaniesService, MockPipe, MockFilterPipe,
                { provide: environment['BASEURL'], useValue: 'http://example.com'},
                { provide: XHRBackend, useClass: MockBackend}
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(SearchComponent);
        const mockSearchResuls = TestBed.createComponent(MockSearchResultsComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should return an Observable using a pipe', inject([CompaniesService, XHRBackend, MockPipe,
        MockFilterPipe], (companySerivce, mockBackend) => {
        const mockResponse = {
            data: [
                { id: 0, name: 'Company 1' },
                { id: 1, name: 'Company 2' },
                { id: 2, name: 'Company 3' },
                { id: 3, name: 'Company 4' },
            ]
        };

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

        companySerivce.getAllCompanies().subscribe((company) => {
            expect(company.length).toBe(4);
            expect(company[0].name).toEqual('Company 1');
            expect(company[1].name).toEqual('Company 2');
            expect(company[2].name).toEqual('Company 3');
            expect(company[3].name).toEqual('Company 4');
        });
    }));
});
