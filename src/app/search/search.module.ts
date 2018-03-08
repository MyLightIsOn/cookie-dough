import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchService } from './search.service';

import { FilterCompaniesPipe } from '../_pipes/filter-companies.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SearchRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBJMGzxIBJi65RT5yeMSlTbBXG46MHgocM'
        })
    ],
    declarations: [
        SearchComponent,
        SearchResultsComponent,
        SearchDetailsComponent,
    ],
    providers: [
        FilterCompaniesPipe,
        SearchService
    ]
})
export class SearchModule {}
