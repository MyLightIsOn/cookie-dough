import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { COMPANIES } from '../mock-companies';
import { ICompany } from '../_interfaces/companies';

@Injectable()
export class CompaniesService {
    constructor(private http: HttpClient) {
        this.serviceInit();
    }

    public companyDataObservable: Observable<any>;
    public searchValueText;
    public companyData;

    /* Method below came from tutorial project. Will use it later.*/
    static getCompanies() { return Observable.of(COMPANIES); }

    // Uses the review average to create the appropriate number of stars
    private createReviewStars(companies$: ICompany) {

        for (const company in companies$) {
            if (company) {
                let reviewAvgParsed: string;
                let reviewAvg: number = companies$[company]['field_32_raw'] % 1;
                reviewAvg = parseFloat(reviewAvg.toFixed(1));

                // Uses the first decimal place to determine whether to round up, down, or set to 0.5 for stars
                if (isNaN(reviewAvg)) {
                    companies$[company]['field_32_raw'] = 0;
                } else if (reviewAvg % 1 <= 0.2) {
                    companies$[company]['field_32_raw'] = Math.floor(companies$[company]['field_32_raw']);
                } else if (reviewAvg % 1 >= 0.3 && reviewAvg % 1 <= 0.6) {
                    companies$[company]['field_32_raw'] = Math.floor(companies$[company]['field_32_raw']) + 0.5;
                } else if (reviewAvg % 1 >= 0.7) {
                    companies$[company]['field_32_raw'] = Math.ceil(companies$[company]['field_32_raw']);
                }

                // Turns the average into a string and replaces the decimal so it can be used for image urls
                reviewAvgParsed = companies$[company]['field_32_raw'].toString();
                companies$[company]['field_32_raw_image'] = reviewAvgParsed.replace('.', '-');
            }

        }
        return (companies$);
    }

    private serviceInit() {
        this.getAllCompanies();
        this.setCompanyData();
    }

    private setCompanyData() {
        this.companyDataObservable.subscribe((data) => {
            this.companyData = this.createReviewStars(data['records']);
        });
    }

    public searchValue(text: string) {
        this.searchValueText = text;
    }

    // Returns an Observable after making an HTTP request to get the companies
    public getAllCompanies(): Observable<Response> {
        return this.companyDataObservable = this.http.get(environment['BASEURL'] + '/companies').map((res: Response) => res);
    }

    /* Method below came from tutorial project. Will use it later.*/
    getCompany(id: number | string) {
        return CompaniesService.getCompanies()
        // (+) before `id` turns the string into a number
            .map(companies => companies.find(company => company.id === + id));
    }
}
