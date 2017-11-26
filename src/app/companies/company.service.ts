import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import { COMPANIES } from '../mock-companies';


export class Company {
    constructor(public id: number, public name: string) { }
}

@Injectable()
export class CompanyService {
    constructor(private http: HttpClient) {}

    companyDataObservable: Observable<object>;
    companies: any[];

    // Uses the review average to create the appropriate number of stars
    static createReviewStars(companies$: object) {
        for (const company in companies$) {
            if (company) {
                let reviewAvg = parseFloat(companies$[company]['field_32_raw']) % 1;
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
    getAllCompanies() {
        return this.companyDataObservable = this.http.get(environment['BASEURL'] + '/companies').map((res: Response) => res);
    }

    getCompanies() { return Observable.of(COMPANIES); }

    getCompany(id: number | string) {
        return this.getCompanies()
        // (+) before `id` turns the string into a number
            .map(companies => companies.find(company => company.id === + id));
    }
}
