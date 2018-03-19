import {async, TestBed, inject, ComponentFixture} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { AppService } from '../app.service';


const mockCompanyService = {
    searchValue: jasmine.createSpy('searchValue')
};

const router = {
    navigate: jasmine.createSpy('navigate')
};

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchComponent ],
            imports: [ HttpClientTestingModule, FormsModule ],
            providers: [ AppService,
                { provide: SearchService, useValue: mockCompanyService },
                { provide: Router, useValue: router }
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
            [SearchService],
            (searchService: SearchService) => {

                searchService.paginationPage = 1;
                component.ngOnInit();
                expect(searchService.paginationPage).toBeUndefined();
            }
        )
    );

    it('should set searchStarted prop to true for mobile', async(() => {
        component.searchStarted = false;
        component.appService.device = 'mobile';

        component.searchStart();
        expect(component.searchStarted).toBeTruthy();
    }));

    it('should set searchStarted prop to false for desktop', async(() => {
        component.searchStarted = false;
        component.appService.device = 'desktop';

        component.searchStart();
        expect(component.searchStarted).toBeFalsy();
    }));


    it('should submit the search', async(() => {
        component.searchText = 'test';

        component.searchSubmit();
        expect(mockCompanyService.searchValue).toHaveBeenCalledWith('test');
        expect(router.navigate).toHaveBeenCalledWith(['/search-results']);
    }));

    it('should show an error with no search text', async(() => {
        component.searchText = undefined;

        component.searchSubmit();
        expect(component.searchError).toBeTruthy();
    }));
});
