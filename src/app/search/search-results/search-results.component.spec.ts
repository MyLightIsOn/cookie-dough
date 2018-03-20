import {async, inject, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { SearchResultsComponent } from './search-results.component';
import {SearchDetailsComponent} from '../search-details/search-details.component';

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
    getCompany: jasmine.createSpy('getCompany'),
    sortOrder: undefined
};

describe('SearchResultsComponent', () => {

    const appConatiner = '<div id="app-container"></div>';

    document.body.insertAdjacentHTML(
        'afterbegin',
        appConatiner);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, AgmCoreModule.forRoot({
                apiKey: 'AIzaSyBJMGzxIBJi65RT5yeMSlTbBXG46MHgocM'
            }), RouterTestingModule.withRoutes([
                { path: '123456', component: SearchDetailsComponent}
            ]) ],
            declarations: [ SearchResultsComponent, SearchDetailsComponent, MockFilterPipe ],
            providers: [ SearchService, AppService,
                { provide: CompaniesService, useValue: mockCompanyService },
            ]
        })
            .compileComponents();
    }));

    it('should create the component and set the desc property to true', inject([SearchService], (service: SearchService) => {
        service.sortOrder = 'desc';
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.ngOnInit();
        expect(component.desc).toBeTruthy();
        expect(component).toBeTruthy();
    }));

    it('should create the component and set the desc property to false', inject([SearchService], (service: SearchService) => {
        service.sortOrder = 'asc';
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.ngOnInit();
        expect(component.desc).toBeFalsy();
        expect(component).toBeTruthy();
    }));

    it('should set the identifier if a company url name exists', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        const company = {};
        company['id'] = '12345';
        company['field_33_raw'] = 'name';

        expect(component.setIdentifier(company)).toBe('name');

        company['field_33_raw'] = undefined;
        expect(component.setIdentifier(company)).toBe('12345');
    });

    it('should check the pagination page', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        let page = 2;

        spyOn(component, 'setPage');
        component.paginationCheck(page);

        expect(component.setPage).toHaveBeenCalledWith(2);

        page = undefined;
        component.paginationCheck(page);
        expect(component.setPage).toHaveBeenCalledWith(1);
    });

    it('should set the pagination according to the number of companies', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;
        component.ngOnInit();

        component.setPage(0);
        expect(component.pager['currentPage']).toBe(1);

        component.setPage(2);
        expect(component.pager['currentPage']).toBe(2);
    });

    it('should not set the pagination', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.setPage(0);
        expect(component.pager['currentPage']).toBeUndefined();
    });

    it('should change the sort order', inject([SearchService], (mockSearchService: SearchService) => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

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
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.sortOpen = true;
        mockSearchService.paginationPage = 2;

        component.resetData();
        expect(component.sortOpen).toBeFalsy();
        expect(mockSearchService.sortType).toBe('field_3');
        expect(mockSearchService.sortOrder).toBe('asc');
        expect(mockSearchService.paginationPage).toBe(1);
    }));

    it('will set the sort dropdown', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.sortTypeText = 'field_3';
        expect(component.setSortName()).toBe('Name');

        component.sortTypeText = 'field_34';
        expect(component.setSortName()).toBe('Country');

        component.sortTypeText = 'field_32_raw';
        expect(component.setSortName()).toBe('Stars');

        component.sortTypeText = 'field_31';
        expect(component.setSortName()).toBe('Reviews');

        component.sortTypeText = 'field_11';
        expect(component.setSortName()).toBeUndefined();
    });


    it('should start a new search', () => {
        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.searchAgain();
        expect(component.searchText).toBe(component.newSearchText);
    });

    it('should hide the nav when searching', inject([AppService], (service: AppService) => {
        service.device = 'mobile';
        const company = {
            field_4_raw: {
                latitude: 1,
                longitude: 2
            },
            field_33_raw: '123456'
        };

        const fixture = TestBed.createComponent(SearchResultsComponent);
        const component = fixture.debugElement.componentInstance;

        component.previewCompany(company);
        expect(component.lat).toBeUndefined();
        expect(component.lng).toBeUndefined();

        service.device = 'desktop';

        component.previewCompany(company);
        expect(component.companyPreview).toBe(company);
        expect(component.lat).toBe(1);
        expect(component.lng).toBe(2);
    }));
});

