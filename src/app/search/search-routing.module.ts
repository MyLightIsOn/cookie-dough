import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchResolverService } from './search-resolver.service';


const searchRoutes: Routes = [
    { path: 'search',  component: SearchComponent },
    { path: 'search-results',  component: SearchResultsComponent },
    { path: ':id',
        component: SearchDetailsComponent,
        resolve: {
            company: SearchResolverService
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(searchRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SearchResolverService
    ]
})
export class SearchRoutingModule { }
