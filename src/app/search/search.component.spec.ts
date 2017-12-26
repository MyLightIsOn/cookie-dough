import {async, TestBed, inject, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { CompaniesService } from '../companies/companies.service';

const mockCompanyService = {
    searchValue: jasmine.createSpy('searchValue')
};

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent ],
            imports: [ RouterTestingModule, HttpClientTestingModule, FormsModule ],
            providers: [ CompaniesService,
                { provide: CompaniesService, useValue: mockCompanyService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));

    it(
        'should set paginationPage to undefined',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {

                companiesService.paginationPage = 1;
                component.ngOnInit();
                expect(companiesService.paginationPage).toBeUndefined();
            }
        )
    );

    it('should set searchStarted prop to true', async(() => {
        component.searchStarted = false;
        component.searchStart();
        expect(component.searchStarted).toBeTruthy();
    }));


    it('should submit the search', async(() => {
        const input = '<form name="myForm"><input type="text" name="one" id="main-search">';

        document.body.insertAdjacentHTML(
            'afterbegin',
            input);

        const inputVar = <HTMLInputElement>document.getElementById('main-search');
        inputVar.value = 'test';

        component.searchSubmit();
        expect(mockCompanyService.searchValue).toHaveBeenCalledWith('test');
    }));
});
