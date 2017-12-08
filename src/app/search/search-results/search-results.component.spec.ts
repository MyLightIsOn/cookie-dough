import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class MockFilterPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }
}


describe('SearchResultsComponent', () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    const mockCompanyObject = { id: 0, field_3: 'Company 1', field_4_raw: {}, field_29: true, field_32_raw: 1, field_32_raw_image: '1' };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SearchResultsComponent, MockFilterPipe ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        component.company = mockCompanyObject;
        fixture.detectChanges();
    });

    it('should create search result component', () => {
        expect(component).toBeTruthy();
    });
});
