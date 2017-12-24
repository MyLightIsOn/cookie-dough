import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchResultsComponent } from './search-results.component';

import { Pipe, PipeTransform } from '@angular/core';
import { CompaniesService } from '../../companies/companies.service';
import { PaginationService } from '../../pagination/pagination.service';

@Pipe({
    name: 'filter'
})
export class MockFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}

const mockCompanyService = {
    startAtDetails: true,
    companyDataObservable: {},
    setFlag: jasmine.createSpy('setFlag'),
    setSocialMedia: jasmine.createSpy('setSocialMedia')
};

const mockPaginationService = {
    getPager: jasmine.createSpy('getPager'),
};

describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            declarations: [ SearchResultsComponent, MockFilterPipe ],
            providers: [ CompaniesService,
                { provide: CompaniesService, useValue: mockCompanyService },
                PaginationService,
                { provide: PaginationService, useValue: mockPaginationService },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create search result component', () => {
        expect(component).toBeTruthy();
    });

    it('should set the identifier if a company url name exists', () => {
        const company = {};
        company['id'] = '12345';
        company['field_33_raw'] = 'name';

        expect(component.setIdentifier(company)).toBe('name');

        company['field_33_raw'] = undefined;
        expect(component.setIdentifier(company)).toBe('12345');
    });

    it('should check the pagination page', () => {
        let page = 2;

        spyOn(component, 'setPage');
        component.paginationCheck(page);

        expect(component.setPage).toHaveBeenCalledWith(2);

        page = undefined;
        component.paginationCheck(page);
        expect(component.setPage).toHaveBeenCalledWith(1);
    });

    it('will create pagination based on number of companies', () => {
        component.filteredCompanies = [1, 2, 3];
        component.pager['totalpages'] = -1;
        component.setPage(0);

        component.pager['totalpages'] = 2;
        component.setPage(2);

        expect(component.pager['currentPage']).toBe(2);
    });
});
