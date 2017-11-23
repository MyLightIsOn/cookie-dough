import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Company } from '../company.service';
import {DialogService} from '../../dialogs/dialog.service';

@Component({
    selector: 'app-company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['../companies.component.css']
})
export class CompanyDetailComponent implements OnInit {
    company: Company;
    editName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService
    ) {}

    ngOnInit() {
        this.route.data
            .subscribe((data: { company: Company }) => {
                this.editName = data.company.name;
                this.company = data.company;
            });
    }

    goToCompanies() {
        const companyId = this.company ? this.company.id : null;
        this.router.navigate(['/companies', { id: companyId}]);
    }

    cancel() {
        this.goToCompanies();
    }

    save() {
        this.company.name = this.editName;
        this.goToCompanies();
    }

    canDeactivate(): Observable<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.company || this.company.name === this.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }

}
