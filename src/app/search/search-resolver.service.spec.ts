import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';


import { SearchResolverService } from './search-resolver.service';
import { CompaniesService } from '../companies/companies.service';
import { SearchService } from './search.service';


const router = {
    navigate: jasmine.createSpy('navigate')
};

const snapshot = {
    paramMap: jasmine.createSpy('paramMap')
};

const routerSnapshot = {
    paramMap: jasmine.createSpy('paramMap')
};

const dataArray = [
    { id: '0', field_3: 'company 1', field_2_raw: {}, field_29: true, field_32_raw: 0.1},
    { id: '1', field_3: 'company 2', field_2_raw: {}, field_29: true, field_32_raw: 0.4},
    { id: '2', field_3: 'company 3', field_2_raw: {}, field_29: true, field_32_raw: 0.5},
    { id: '3', field_3: 'company 4', field_2_raw: {}, field_29: true, field_32_raw: 0.7},
    { id: '4', field_3: 'company 5', field_2_raw: {}, field_29: true, field_32_raw: 1},
    { id: '5', field_3: 'company 6', field_2_raw: {}, field_29: true, field_32_raw: undefined}
];


const mockCompanyService = {
    startAtDetails: true,
    companyData: undefined,
    companyDataObservable: dataArray,
    setFlag: jasmine.createSpy('setFlag'),
    setSocialMedia: jasmine.createSpy('setSocialMedia'),
    getCompany: jasmine.createSpy('getCompany')
};

const mockCompanyService2 = {
    startAtDetails: true,
    companyData: dataArray[0],
    companyDataObservable: dataArray,
    setFlag: jasmine.createSpy('setFlag'),
    setSocialMedia: jasmine.createSpy('setSocialMedia'),
    getCompany: jasmine.createSpy('getCompany')
};

const mockSearchService = {
    startAtDetails: true,
};

const fakeRoute = new ActivatedRouteSnapshot();

let mockSnapshot: RouterStateSnapshot;

describe('SearchResolverService with data', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            providers: [ SearchResolverService, CompaniesService, SearchService,
                { provide: SearchService, useValue: mockSearchService },
                { provide: CompaniesService, useValue: mockCompanyService },
                { provide: Router, useValue: router },
                { provide: ActivatedRouteSnapshot, useValue: snapshot },
                { provide: RouterStateSnapshot, useValue: routerSnapshot }
            ]
        });
    });

    it('should be created', inject([SearchResolverService], (service: SearchResolverService) => {
        expect(service).toBeTruthy();
    }));

    it('should be created', inject([SearchResolverService], (service: SearchResolverService) => {
        service.resolve(fakeRoute, mockSnapshot);
    }));
});

describe('SearchResolverService without data', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule ],
            providers: [ SearchResolverService, CompaniesService, SearchService,
                { provide: SearchService, useValue: mockSearchService },
                { provide: CompaniesService, useValue: mockCompanyService2 },
                { provide: Router, useValue: router },
                { provide: ActivatedRouteSnapshot, useValue: snapshot },
                { provide: RouterStateSnapshot, useValue: routerSnapshot }
            ]
        });
    });

    it('should be created', inject([SearchResolverService], (service: SearchResolverService) => {
        service.resolve(fakeRoute, mockSnapshot);
    }));
});
