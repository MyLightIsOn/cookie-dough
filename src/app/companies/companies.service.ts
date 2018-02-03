import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { environment } from '../../environments/environment';
import { ICompany } from '../_interfaces/companies';

@Injectable()
export class CompaniesService {
    constructor(private http: HttpClient) {}

    public companyDataObservable;
    public companyData: any;

    // Uses the review average to create the appropriate number of stars
    private createReviewStars(companies$: ICompany) {

        for (const company in companies$) {

            if (company) {
                let reviewAvgParsed: string;
                let reviewAvg: number = companies$[company]['field_32_raw'] % 1;
                reviewAvg = parseFloat(reviewAvg.toFixed(1));

                // Uses the first decimal place to determine whether to round up, down, or set to 0.5 for stars
                if (isNaN(reviewAvg)) {
                    companies$[company]['field_32_raw'] = 0;
                } else if (reviewAvg % 1 <= 0.2) {
                    companies$[company]['field_32_raw'] = Math.floor(companies$[company]['field_32_raw']);
                } else if (reviewAvg % 1 >= 0.3 && reviewAvg % 1 <= 0.6) {
                    companies$[company]['field_32_raw'] = Math.floor(companies$[company]['field_32_raw']) + 0.5;
                } else if (reviewAvg % 1 >= 0.7) {
                    companies$[company]['field_32_raw'] = Math.ceil(companies$[company]['field_32_raw']);
                }

                // Turns the average into a string and replaces the decimal so it can be used for image urls
                reviewAvgParsed = companies$[company]['field_32_raw'].toString();
                companies$[company]['field_32_raw_image'] = reviewAvgParsed.replace('.', '-');
            }

        }
        return (companies$);
    }

    // Returns an Observable after making an HTTP request and creating review stars
    public getAllCompanies() {
        this.companyDataObservable = this.http.get(environment['BASEURL'] + '/api/companies').map((res) => {
            res = this.createReviewStars(res['records']);
            res = this.setCountrySortName(res);
            this.companyData = res;
            return res;
        }).share();
        return this.companyDataObservable;
    }

    // Used by the search resolver to find the selected company
    public getCompany(id) {
        const selectedCompany = this.companyData.find(company => company.id === id);
        const selectedCompanyUrl = this.companyData.find(company => company['field_33_raw'] === id);

        if (selectedCompanyUrl) {
            return selectedCompanyUrl;
        } else {
            return selectedCompany;
        }
    }

    // Sets the class for images based on social media
    public setSocialMedia(array) {
        array.map( x => {
            if (x['url'].indexOf('pinterest.com') !== -1) {
                x['social-media-class'] = 'pinterest';
            }

            if (x['url'].indexOf('facebook.com') !== -1) {
                x['social-media-class'] = 'facebook';
            }

            if (x['url'].indexOf('instagram.com') !== -1) {
                x['social-media-class'] = 'instagram';
            }

            if (x['url'].indexOf('wechat') !== -1) {
                x['social-media-class'] = 'wechat';
            }

            if (x['url'].indexOf('twitter.com') !== -1) {
                x['social-media-class'] = 'twitter';
            }

            if (x['url'].indexOf('youtube.com') !== -1) {
                x['social-media-class'] = 'youtube';
            }
        });
    }

    // Sets the image for the company's country flag
    public setFlag(text: string) {
        return text.replace(' ', '_').toLowerCase();
    }

    public setCountrySortName(companyData) {

        for (const index in companyData) {
            if (companyData[index]) {
                const company = companyData[index];
                company['field_34'] = company['field_4_raw']['country'];
            }
        }
        return companyData;
    }
}
