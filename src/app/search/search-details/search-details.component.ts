import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompany } from '../../_interfaces/companies';

@Component({
    selector: 'app-search-details',
    templateUrl: './search-details.component.html',
    styleUrls: ['./search-details.component.css'],
})
export class SearchDetailsComponent implements OnInit {
    public company: ICompany;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.company = this.route.snapshot.data['company'];
    }
}
