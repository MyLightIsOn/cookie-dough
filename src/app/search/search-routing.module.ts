import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchResolverService } from './search-resolver.service';

import { LoginModule} from '../login/login.module';

const searchRoutes: Routes = [
    {
        path: 'search',
        component: SearchComponent,
        data: { page: 'search' }
    },
    {
        path: 'search-results',
        component: SearchResultsComponent,
        data: { page: 'search-results' }
    },
    {
        path: ':id',
        component: SearchDetailsComponent,
        resolve: {
            company: SearchResolverService
        },
        data: { page: 'search-detail' }
    }
];

@NgModule({
    imports: [
        LoginModule,
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
