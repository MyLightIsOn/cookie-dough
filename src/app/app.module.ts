import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';

import { SearchComponent } from './search/search.component';
import { SearchDetailsComponent } from './search/search-details.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchDetailsComponent,
        RegisterComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        RoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
