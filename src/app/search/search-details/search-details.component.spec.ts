import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchDetailsComponent } from './search-details.component';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { AppService } from '../../app.service';


const mockCompanyService = {
    companyDataObservable: {},
    setFlag: jasmine.createSpy('setFlag'),
    setSocialMedia: jasmine.createSpy('setSocialMedia')
};

const mockSearchService = {
    startAtDetails: true,
};

const company = {
    id: 0,
    field_7: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
    ' Nullam vel neque eget enim tempus cursus. Curabitur porta ' +
    'velit consequat pulvinar dignissim. Lorem ipsum dolor ' +
    'sit amet',
    field_4_raw: {
        country: 'HK'
    },
    field_5_raw: {
        thumb_url: ''
    },
    field_14_raw: '',
    field_15_raw: '',
    field_16_raw: ''
};

const route = {
    snapshot: {
        data: {
            company: company
        }
    }
};

const router = {
    navigate: jasmine.createSpy('navigate')
};

describe('SearchDetailsComponent', () => {
    let component: SearchDetailsComponent;
    let fixture: ComponentFixture<SearchDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, HttpClientModule, AgmCoreModule.forRoot({
                apiKey: 'AIzaSyBJMGzxIBJi65RT5yeMSlTbBXG46MHgocM'
            }) ],
            declarations: [ SearchDetailsComponent ],
            providers: [ CompaniesService, AppService,
                { provide: SearchService, useValue: mockSearchService },
                { provide: CompaniesService, useValue: mockCompanyService },
                { provide: ActivatedRoute, useValue: route },
                { provide: Router, useValue: router }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set up company to display', () => {
        spyOn(component, 'truncateDescription');

        component.ngOnInit();
        expect(component.truncateDescription).toHaveBeenCalledWith(company['field_7']);
        expect(mockCompanyService.setFlag).toHaveBeenCalledWith(company['field_4_raw']['country']);
        expect(mockCompanyService.setFlag).toHaveBeenCalledWith(company['field_4_raw']['country']);
        expect(mockCompanyService.setSocialMedia).toHaveBeenCalledWith([
            company['field_14_raw'],
            company['field_15_raw'],
            company['field_16_raw']]
        );
    });

    it('should toggle the truncated text', () => {
        component.truncatedText = true;
        component.toggled = true;
        component.toggleDescription();

        expect(component.truncatedText).toBeFalsy();
        expect(component.toggled).toBeFalsy();
    });

    it('should check for startAtDetails and route accordingly', () => {
        component.closeDetails();
        expect(router.navigate).toHaveBeenCalledWith(['/']);

        component.closeDetails();
        expect(router.navigate).toHaveBeenCalledWith(['/search-results']);
    });

    it('should truncate text if over 150 characters', () => {
        const text = 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Nullam vel neque eget enim tempus ' +
            'cursus. Curabitur porta velit consequat pulvinar' +
            ' dignissim. Lorem ipsum dolor sit amet';
        const truncText = component.truncateDescription(company['field_7']);

        expect(truncText.length).toBe(153);
    });

    it('should NOT truncate text if under 150 characters', () => {
        component.toggled = true;
        const text = 'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Nullam vel neque eget enim tempus ' +
            'cursus';
        const truncText = component.truncateDescription(text);

        expect(truncText.length).toEqual(text.length);
        expect(component.toggled).toBeFalsy();
    });
});
