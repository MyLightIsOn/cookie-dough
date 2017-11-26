import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MockCompany } from '../../mock-companies';
import { CompanyService } from '../company.service';

@Component({
    selector: 'app-companies',
    templateUrl: './company-list.component.html',
    styleUrls: ['../companies.component.css'],
    providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
    companies$: Observable<MockCompany[]>;

    private selectedId: number;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        CompanyService.getCompanies();

        this.companies$ = this.route.paramMap
            .switchMap((params: ParamMap) => {
                this.selectedId = + params.get('id');
                return CompanyService.getCompanies();
            });
    }
}
