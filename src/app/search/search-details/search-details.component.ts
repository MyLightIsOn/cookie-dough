import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICompany } from '../../_interfaces/companies';
import { CompaniesService } from '../../companies/companies.service';
import { SearchService } from '../search.service';
import { AppService } from '../../app.service';
import * as countries from '../../json/countries.json';

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
    public companyCountryName: string;
    public companyISOCode: string;
    public time;

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
            this.company['field_5_truncated'] = this.truncateDescription(this.company['field_5']);
            this.companyService.setSocialMedia([
                this.company['field_12_raw'],
                this.company['field_13_raw'],
                this.company['field_14_raw']
            ]);
            this.lat = this.company['field_2_raw']['latitude'];
            this.lng = this.company['field_2_raw']['longitude'];
            this.setFlag(this.company['field_2_raw']['country']);
          this.formatBusinessHours(this.company['field_15']);
            if (this.appService.device === 'mobile') {
                this.mapOff = true;
            } else {
                this.mapOff = false;
            }
        } else {
            this.router.navigate(['/not-found']);
        }
    }

  formatBusinessHours(field) {
    if (field) {
      this.time = JSON.parse(field);
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

    setFlag(country: string) {
        for (const index of Object.keys(countries)) {
            if (countries[index].name === country) {
                this.companyCountryName = countries[index].name;
                this.companyISOCode = countries[index].alpha2.toLowerCase();
            }
        }
    }
}
