import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompany } from '../../_interfaces/companies';
import { slideInOutAnimation } from '../../_animations/slide-in-out.animation';


@Component({
    selector: 'app-search-details',
    templateUrl: './search-details.component.html',
    styleUrls: ['./search-details.component.css'],
    animations: [slideInOutAnimation]
})
export class SearchDetailsComponent implements OnInit {
    @HostBinding('@slideInOutAnimation') slideInOutAnimation = true;
    public company: ICompany;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.company = this.route.snapshot.data['company'];
    }
}
