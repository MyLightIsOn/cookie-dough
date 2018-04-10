import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompaniesService } from './companies.service';
import { environment } from '../../environments/environment';

describe('CompaniesService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ CompaniesService ]
        });
    });

    it('should get all of the companies', async(inject([CompaniesService, HttpTestingController],
        (companiesService: CompaniesService, backend: HttpTestingController) => {

            const mockCompanies = [
                { id: '0', field_3: 'company 1', field_4_raw: {}, field_29: true, field_42: 0.1},
            ];

            companiesService.getAllCompanies().subscribe();

            const req = backend.expectOne({method: 'GET'}, environment['BASEURL'] + '/companies');
            expect(req.request.method).toEqual('GET');
            req.flush(mockCompanies);
        })
    ));

    it(
        'should format review stars',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {
                const mockCompanies = [
                    { id: '0', field_1: 'company 1', field_2: 'address', field_17: true, field_29: true, field_42: 0.1},
                    { id: '1', field_1: 'company 1', field_2: 'address', field_17: true, field_29: true, field_42: 0.4},
                    { id: '2', field_1: 'company 2', field_2: 'address', field_17: true, field_29: true, field_42: 0.5},
                    { id: '3', field_1: 'company 2', field_2: 'address', field_17: true, field_29: true, field_42: 0.7},
                    { id: '4', field_1: 'company 2', field_2: 'address', field_17: true, field_29: true, field_42: 1},
                    { id: '5', field_1: 'company 2', field_2: 'address', field_17: true, field_29: true, field_42: undefined}
                ];

                companiesService['createReviewStars'](mockCompanies);
                expect(mockCompanies[0]['field_42']).toEqual(0);
                expect(mockCompanies[1]['field_42']).toEqual(0.5);
                expect(mockCompanies[2]['field_42']).toEqual(0.5);
                expect(mockCompanies[3]['field_42']).toEqual(1);
                expect(mockCompanies[4]['field_42']).toEqual(1);
                expect(mockCompanies[5]['field_42']).toEqual(0);
            }
        )
    );

    it(
        'should return the selected company',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {
                companiesService.companyData = [
                    { id: '0', field_3: 'company 1', field_4_raw: {}, field_29: true, field_42: 1},
                    { id: '1', field_3: 'company 2', field_33_raw: 'test-1'},
                ];

                let selectedCompany = companiesService.getCompany('0');
                expect(selectedCompany).toBe(companiesService.companyData[0]);

                selectedCompany = companiesService.getCompany('test-1');
                expect(selectedCompany).toBe(companiesService.companyData[1]);
            }
        )
    );

    it(
        'should set social media class',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {

                const company = {};
                company['field_14_raw'] = {
                    url: 'test@facebook.com'
                };

                company['field_15_raw'] = {
                    url: 'test@pinterest.com'
                };

                company['field_16_raw'] = {
                    url: 'test@instagram.com'
                };

                company['field_17_raw'] = {
                    url: 'test@wechat.com'
                };

                company['field_18_raw'] = {
                    url: 'test@twitter.com'
                };

                company['field_19_raw'] = {
                    url: 'test@youtube.com'
                };

                companiesService.setSocialMedia([
                    company['field_14_raw'],
                    company['field_15_raw'],
                    company['field_16_raw'],
                    company['field_17_raw'],
                    company['field_18_raw'],
                    company['field_19_raw']
                ]);
                expect(company['field_14_raw']['social-media-class']).toBe('facebook');
                expect(company['field_15_raw']['social-media-class']).toBe('pinterest');
                expect(company['field_16_raw']['social-media-class']).toBe('instagram');
                expect(company['field_17_raw']['social-media-class']).toBe('wechat');
                expect(company['field_18_raw']['social-media-class']).toBe('twitter');
                expect(company['field_19_raw']['social-media-class']).toBe('youtube');
            }
        )
    );

    it(
        'should return the country name without spaces',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {
                const countryName = 'Hong Kong';

                const noSpaces = companiesService.setFlag(countryName);
                expect(noSpaces).toBe('hong_kong');
            }
        )
    );

    it(
        'should return country data with new field',
        inject(
            [CompaniesService],
            (companiesService: CompaniesService) => {
                const mockCompanies = [
                    {
                        field_2_raw: {
                            country: 'Hong Kong'
                        }
                    },
                ];

                companiesService.setCountrySortName(mockCompanies);
                expect(mockCompanies[0]['field_34']).toBe('Hong Kong');
            }
        )
    );
});
