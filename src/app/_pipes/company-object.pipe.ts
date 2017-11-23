import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyObject'
})
export class CompanyObjectPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      const keys = [];

      if (value) {
          for (let key in value) {
            keys.push(value[key]);
          }
      }
      return keys;
  }
}
