import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent }    from './search.component';
import { SearchDetailsComponent }  from './search-details.component';

const searchRoutes: Routes = [
    { path: 'search',  component: SearchComponent },
    { path: 'search/:id', component: SearchDetailsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(searchRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SearchRoutingModule { }