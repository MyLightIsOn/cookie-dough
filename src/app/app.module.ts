import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { RoutingModule } from './routing.module';
import { CompanyModule } from './companies/companies.module';
import { SearchModule } from './search/search.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DialogService } from './dialogs/dialog.service';
import { FilterCompaniesPipe } from './_pipes/filter-companies.pipe';


@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        PageNotFoundComponent,
        FilterCompaniesPipe
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CompanyModule,
        SearchModule,
        LoginModule,
        RoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
