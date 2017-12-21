import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';

import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchResolverService  implements Resolve<any> {
    constructor(private companyService: CompaniesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompany> {
        const id = route.paramMap.get('id');

        // When the company data array is present, this will return the company that matches the id
        if (this.companyService.companyData) {
            console.log('data here!');
            return this.companyService.getCompany(id);
        } else {
            console.log('data not here');
            return this.companyService.companyDataObservable.map(companyArray => {
                if (companyArray) {
                    return this.companyService.getCompany(id);
                } else {
                    this.router.navigate(['/register']);
                    return null;
                }
            });
        }

    }
}
