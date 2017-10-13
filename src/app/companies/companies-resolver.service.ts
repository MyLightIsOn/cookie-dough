import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';

import { Company, CompanyService }  from './company.service';

@Injectable()
export class CompaniesResolverService implements Resolve<Company> {
    constructor(private cs: CompanyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
        let id = route.paramMap.get('id');

        return this.cs.getCompany(id).take(1).map(company => {
            if (company) {
                return company;
            } else { // id not found
                this.router.navigate(['/companies']);
                return null;
            }
        });
    }
}