import { Injectable } from '@angular/core';

import { Company } from '../companies';
import { COMPANIES } from '../mock-companies';

@Injectable()
export class CompanyService {
    getCompanies(): Promise<Company[]> {
        return Promise.resolve(COMPANIES);
    }

    // See the "Take it slow" appendix
    getCompaniesSlowly(): Promise<Company[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getCompanies()), 2000);
        });
    }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/