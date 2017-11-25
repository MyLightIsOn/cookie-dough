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
