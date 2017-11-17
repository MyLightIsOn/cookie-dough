import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Company } from '../_interfaces/companies';
import { CompanyService } from './company.service';

@Component({
    selector: 'app-companies',
    templateUrl: './company-list.component.html',
    styleUrls: ['./companies.component.css'],
    providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
    companies$: Observable<Company[]>;

    private selectedId: number;

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.companyService.testGrab();

        this.companies$ = this.route.paramMap
            .switchMap((params: ParamMap) => {
                this.selectedId = + params.get('id');
                return this.companyService.getCompanies();
            });
    }
}
