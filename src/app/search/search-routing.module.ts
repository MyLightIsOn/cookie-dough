import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search.component';

const searchRoutes: Routes = [
    { path: 'search',  component: SearchComponent },
    { path: 'search-results',  component: SearchResultsComponent }
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
