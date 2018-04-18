import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
    name: 'filterCountry',
    pure: false
})
@Injectable()
export class FilterCountriesPipe implements PipeTransform {

    transform(items: any[], filter: string): any {
        let text;
        if (filter) {
            text = filter.toUpperCase();
        }

        if (!items || !text) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1);
    }
}
