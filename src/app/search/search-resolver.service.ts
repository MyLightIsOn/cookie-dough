import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';

import { CompaniesService } from '../companies/companies.service';
import { SearchService } from './search.service';
import { ICompany } from '../_interfaces/companies';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchResolverService  implements Resolve<any> {
    constructor(private companyService: CompaniesService, private searchService: SearchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompany> {

        const id = route.paramMap.get('id');

        // Resolves the company data before loading the route. If company data is not
        // present, it uses the company service Observable.
        if (this.companyService.companyData) {
            return this.companyService.getCompany(id);
        } else {
            return this.companyService.companyDataObservable.map(companyArray => {
                this.searchService.startAtDetails = true;
                return this.companyService.getCompany(id);
            });
        }
    }
}
