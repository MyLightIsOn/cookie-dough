import {async, TestBed, inject, ComponentFixture} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

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
            providers: [ SearchService,
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

    it('should set searchStarted prop to true', async(() => {
        component.searchStarted = false;
        component.searchStart();
        expect(component.searchStarted).toBeTruthy();
    }));


    it('should submit the search', async(() => {
        component.searchText = 'test';

        component.searchSubmit();
        expect(mockCompanyService.searchValue).toHaveBeenCalledWith('test');
        expect(router.navigate).toHaveBeenCalledWith(['/search-results']);
    }));
});
