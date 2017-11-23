import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { RoutingModule } from './routing/routing.module';
import { CompanyModule } from './companies/company.module';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { DialogService } from './dialogs/dialog.service';
import { CompanyObjectPipe } from './_pipes/company-object.pipe';
import { FilterCompaniesPipe } from './_pipes/filter-companies.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        RegisterComponent,
        PageNotFoundComponent,
        ComposeMessageComponent,
        LoginComponent,
        CompanyObjectPipe,
        FilterCompaniesPipe
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CompanyModule,
        LoginRoutingModule,
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
