import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { SearchResultsComponent } from './search-results.component';

import { Pipe, PipeTransform } from '@angular/core';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { AppService } from '../../app.service';

@Pipe({
    name: 'filter'
})
export class MockFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}

const dataArray = [
    { id: '0', field_3: 'company 1', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.1},
    { id: '1', field_3: 'company 2', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.4},
    { id: '2', field_3: 'company 3', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.5},
    { id: '3', field_3: 'company 4', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.7},
    { id: '4', field_3: 'company 5', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 1},
    { id: '5', field_3: 'company 6', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: undefined},
    { id: '0', field_3: 'company 1', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.1},
    { id: '1', field_3: 'company 2', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.4},
    { id: '2', field_3: 'company 3', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.5},
    { id: '3', field_3: 'company 4', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.7},
    { id: '4', field_3: 'company 5', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 1},
    { id: '5', field_3: 'company 6', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: undefined},
    { id: '0', field_3: 'company 1', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.1},
    { id: '1', field_3: 'company 2', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.4},
    { id: '2', field_3: 'company 3', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.5},
    { id: '3', field_3: 'company 4', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 0.7},
    { id: '4', field_3: 'company 5', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: 1},
    { id: '5', field_3: 'company 6', field_4_raw: {}, field_5_raw: { thumb_url: '/' }, field_29: true, field_32_raw: undefined}
];


const mockCompanyService = {
    startAtDetails: true,
    companyData: dataArray,
    companyDataObservable: dataArray,
    setFlag: jasmine.createSpy('setFlag'),
    setSocialMedia: jasmine.createSpy('setSocialMedia'),
    getCompany: jasmine.createSpy('getCompany')
};

describe('SearchResultsComponent with two pages', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;

    const appConatiner = '<div id="app-container"></div>';

    document.body.insertAdjacentHTML(
        'afterbegin',
        appConatiner);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, FormsModule, AgmCoreModule.forRoot({
                apiKey: 'AIzaSyBJMGzxIBJi65RT5yeMSlTbBXG46MHgocM'
            }) ],
            declarations: [ SearchResultsComponent, MockFilterPipe ],
            providers: [ SearchService, AppService,
                { provide: CompaniesService, useValue: mockCompanyService },
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

    it('will set the pagination page', () => {
        component.setPage(0);
        expect(component.pager['currentPage']).toBe(1);

        component.setPage(2);
        expect(component.pager['currentPage']).toBe(2);
    });

    it('should change the sort order', inject([SearchService], (mockSearchService: SearchService) => {
        spyOn(component, 'sortBy');
        mockSearchService.sortType = 'field_3';
        mockSearchService.sortOrder = 'desc';
        mockSearchService.paginationPage = 2;

        component.changeSortOrder();
        expect(component.desc).toBeTruthy();
        expect(component.sortBy).toHaveBeenCalledWith(
            mockSearchService.sortType,
            mockSearchService.sortOrder,
            mockSearchService.paginationPage);

        component.changeSortOrder();
        expect(component.desc).toBeFalsy();
        expect(component.sortBy).toHaveBeenCalledWith(
            mockSearchService.sortType,
            mockSearchService.sortOrder,
            mockSearchService.paginationPage);
    }));

    it('should reset all sort data', inject([SearchService], (mockSearchService: SearchService) => {
        component.sortOpen = true;
        mockSearchService.paginationPage = 2;

        component.resetData();
        expect(component.sortOpen).toBeFalsy();
        expect(mockSearchService.sortType).toBe('field_3');
        expect(mockSearchService.sortOrder).toBe('asc');
        expect(mockSearchService.paginationPage).toBe(1);
    }));

    it('will set the sort dropdown', () => {
        component.sortTypeText = 'field_3';
        expect(component.setSortName()).toBe('Name');

        component.sortTypeText = 'field_34';
        expect(component.setSortName()).toBe('Country');

        component.sortTypeText = 'field_32_raw';
        expect(component.setSortName()).toBe('Stars');

        component.sortTypeText = 'field_31';
        expect(component.setSortName()).toBe('Reviews');
    });
});

