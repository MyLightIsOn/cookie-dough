import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchResolverService } from './search-resolver.service';
import { RegisterComponent } from '../register/register.component';

import { LoginModule } from '../login/login.module';
import { ProfileModule } from '../profile/profile.module';

const searchRoutes: Routes = [
    {
        path: 'register', component: RegisterComponent
    },
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
