import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

 import { Company, CompanyService } from './company.service'

@Component({
    selector: 'company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompanyDetailComponent implements OnInit {
    company$: Observable<Company>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService
    ) {}

    ngOnInit() {
        this.company$ = this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.companyService.getCompany(params.get('id')));
    }

    goToCompanies(company: Company) {
        let companyId = company ? company.id : null;
        this.router.navigate(['/companies', { id: companyId}]);
    }
}
