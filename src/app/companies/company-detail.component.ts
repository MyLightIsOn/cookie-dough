import { Component, Input } from '@angular/core';
import { Company } from '../companies'

@Component({
    selector: 'company-detail',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./companies.component.css']
})
export class CompanyDetailComponent  {
    @Input() company: Company;
}
