import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
export class FilterCompaniesPipe implements PipeTransform {

    /**
     * This doesn't neeed to be a pipe anymore, but I will
     * leave it for now. LM 12/10/2017
     *
     * @items = object from array
     * @term = term's search
     */
    transform(items: any, term: any): any {
        if (term === undefined) { return items; }

        return items.filter(function(item) {
            for (const property in item) {
                if (item[property] === null) {
                    continue;
                }
                if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });
    }
}
