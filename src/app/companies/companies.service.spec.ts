import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CompaniesService } from './companies.service';
import { environment } from '../../environments/environment';

describe('CompaniesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CompaniesService]
        });
    });

    it(
        'should get users',
        inject(
            [HttpTestingController, CompaniesService],
            (
                httpMock: HttpTestingController,
                companiesService: CompaniesService
            ) => {
                const mockCompanies = [
                    { id: '0', field_3: 'company 1', field_4_raw: {}, field_29: true, field_32_raw: 0.1},
                ];

                companiesService.getAllCompanies();
                companiesService.companyDataObservable.subscribe((data) => {
                    expect(data).toBe(mockCompanies);
                });
                const mockReq = httpMock.expectOne(environment['BASEURL'] + '/companies');

                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');

                mockReq.flush(mockCompanies);

                httpMock.verify();
            }
        )
    );

    it(
        'should format review stars',
        inject(
            [HttpTestingController, CompaniesService],
            () => {
                const mockCompanies = [
                    { id: '0', field_3: 'company 1', field_4_raw: {}, field_29: true, field_32_raw: 0.1},
                    { id: '1', field_3: 'company 1', field_4_raw: {}, field_29: true, field_32_raw: 0.4},
                    { id: '2', field_3: 'company 2', field_4_raw: {}, field_29: true, field_32_raw: 0.5},
                    { id: '3', field_3: 'company 2', field_4_raw: {}, field_29: true, field_32_raw: 0.7},
                    { id: '4', field_3: 'company 2', field_4_raw: {}, field_29: true, field_32_raw: 1},
                ];

                CompaniesService.createReviewStars(mockCompanies);
                expect(mockCompanies[0]['field_32_raw']).toEqual(0);
                expect(mockCompanies[1]['field_32_raw']).toEqual(0.5);
                expect(mockCompanies[2]['field_32_raw']).toEqual(0.5);
                expect(mockCompanies[3]['field_32_raw']).toEqual(1);
                expect(mockCompanies[4]['field_32_raw']).toEqual(1);
            }
        )
    );
});
