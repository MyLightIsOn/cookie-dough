import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';

import { CompaniesService } from '../companies/companies.service';
import { ICompany } from '../_interfaces/companies';

@Injectable()
export class SearchResolverService  implements Resolve<any> {
    constructor(private companyService: CompaniesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.paramMap.get('id');

        return this.companyService.companyDataObservable.map(value => {
            if (value) {
                return this.companyService.getCompany(id);
            } else {
                this.router.navigate(['/register']);
                return null;
            }
        });
    }
}
