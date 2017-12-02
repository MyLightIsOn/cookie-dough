import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MockCompany } from '../../mock-companies';
import { CompaniesService } from '../companies.service';

@Component({
    selector: 'app-companies',
    templateUrl: './company-list.component.html',
    styleUrls: ['../companies.component.css'],
    providers: [CompaniesService]
})
export class CompanyListComponent implements OnInit {
    companies$: Observable<MockCompany[]>;

    private selectedId: number;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        CompaniesService.getCompanies();

        this.companies$ = this.route.paramMap
            .switchMap((params: ParamMap) => {
                this.selectedId = + params.get('id');
                return CompaniesService.getCompanies();
            });
    }
}
