import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchResolverService } from './search-resolver.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { LoginModule } from '../login/login.module';
import { ProfileModule } from '../profile/profile.module';
import { RegisterModule } from '../register/register.module';

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
        ProfileModule,
        LoginModule,
        RegisterModule,
        RouterModule.forChild(searchRoutes)
    ],
    declarations: [
        PageNotFoundComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SearchResolverService
    ]
})
export class SearchRoutingModule { }
