import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


import { COMPANIES } from '../mock-companies';


export class Company {
    constructor(public id: number, public name: string) { }
}

@Injectable()
export class CompanyService {

    getCompanies() { return Observable.of(COMPANIES); }

    getCompany(id: number | string) {
        return this.getCompanies()
        // (+) before `id` turns the string into a number
            .map(companies => companies.find(company => company.id === + id));
    }
}

