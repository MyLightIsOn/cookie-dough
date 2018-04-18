import {Pipe, PipeTransform, Injectable} from '@angular/core';
import { ProfileService } from '../profile/profile.service';

@Pipe({
    name: 'filterCountry',
    pure: false
})
@Injectable()
export class FilterCountriesPipe implements PipeTransform {
    constructor(
        public profileService: ProfileService) {}

    transform(items: any[], filter: string): any {
        let text;
        if (filter) {
            text = filter.toUpperCase();
        }

        if (!items || !text) {
            return items;
        }

        this.profileService.filteredCountries = items.filter(item => item.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
        return this.profileService.filteredCountries;
    }
}
