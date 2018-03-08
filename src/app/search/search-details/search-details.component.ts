import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICompany } from '../../_interfaces/companies';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-search-details',
    templateUrl: './search-details.component.html',
    styleUrls: ['./search-details.component.css'],
})
export class SearchDetailsComponent implements OnInit {
    public company: ICompany;
    public truncatedText: boolean;
    public toggled: boolean;
    public lat: number;
    public lng: number;
    public mapOff: boolean;
    public mapButtonText = 'Map';

    constructor(
        private route: ActivatedRoute,
        private companyService: CompaniesService,
        private router: Router,
        private searchService: SearchService,
        private appService: AppService
    ) { }

    // Takes the company data that was returned in the resolver and sets it to company.
    ngOnInit() {
        this.company = this.route.snapshot.data['company'];
        if (this.company) {
            this.company['field_7_truncated'] = this.truncateDescription(this.company['field_7']);
            this.company['country_flag'] = this.companyService.setFlag(this.company['field_4_raw']['country']);
            this.companyService.setSocialMedia([
                this.company['field_14_raw'],
                this.company['field_15_raw'],
                this.company['field_16_raw']
            ]);
            this.lat = this.company['field_4_raw']['latitude'];
            this.lng = this.company['field_4_raw']['longitude'];
            if (this.appService.device === 'mobile') {
                this.mapOff = true;
            } else {
                this.mapOff = false;
            }
        }
    }

    // Checks to see if the details page was visited first.
    // If so, closing details takes the user to the homepage and if not
    // the user goes back to teh serach results.
    closeDetails() {
        if (this.searchService.startAtDetails === true) {
            this.searchService.startAtDetails = false;
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/search-results']);
        }
    }

    // Truncates the description if it is too long.
    truncateDescription(text) {
        if (text.length > 150) {
            this.truncatedText = true;
            return text.substring(0, 150) + '...';
        } else {
            this.toggled = false;
            return text;
        }
    }

    // Toggles the truncated text and whole description.
    toggleDescription() {
        this.truncatedText = !this.truncatedText;
        this.toggled = !this.toggled;
    }

    toggleMap() {
        this.mapOff = !this.mapOff;
        if (this.mapOff === true) {
            this.mapButtonText = 'Map';
        } else {
            this.mapButtonText = 'Close Map';
        }
    }
}
