import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import { COMPANIES } from '../mock-companies';


export class Company {
    constructor(public id: number, public name: string) { }
}

@Injectable()
export class CompanyService {
    constructor(private http: HttpClient) {}
    results: any;

    testGrab() {
        this.http.get(environment.apiUrl + '/companies').subscribe(data => {
            // Read the result field from the JSON response.
            console.log(data);
        });
    }
    
    getCompanies() { return Observable.of(COMPANIES); }

    getCompany(id: number | string) {
        return this.getCompanies()
        // (+) before `id` turns the string into a number
            .map(companies => companies.find(company => company.id === + id));
    }
}

