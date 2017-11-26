import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { COMPANIES } from '../mock-companies';
import { ICompany } from '../_interfaces/companies';

@Injectable()
export class CompanyService {
    constructor(private http: HttpClient) {}

    public companyDataObservable: Observable<Response>;

    /* Method below came from tutorial project. Will use it later.*/
    static getCompanies() { return Observable.of(COMPANIES); }

    // Uses the review average to create the appropriate number of stars
    static createReviewStars(companies$: ICompany) {

        for (const company in companies$) {
            if (company) {
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
            }

        }
        return (companies$);
    }

    // Returns an Observable after making an HTTP request to get the companies
    public getAllCompanies() {
        return this.companyDataObservable = this.http.get(environment['BASEURL'] + '/companies').map((res: Response) => res);
    }

    /* Method below came from tutorial project. Will use it later.*/
    getCompany(id: number | string) {
        return CompanyService.getCompanies()
        // (+) before `id` turns the string into a number
            .map(companies => companies.find(company => company.id === + id));
    }
}
