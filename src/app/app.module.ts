import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { RoutingModule } from './routing.module';
import { CompanyModule } from './companies/companies.module';
import { SearchModule } from './search/search.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DialogService } from './dialogs/dialog.service';
import { AppService } from './app.service';
import { FlashMessagesService } from './flash-messages.service';
import { FilterCompaniesPipe } from './_pipes/filter-companies.pipe';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        FilterCompaniesPipe
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBJMGzxIBJi65RT5yeMSlTbBXG46MHgocM'
        }),
        BrowserAnimationsModule,
        BrowserModule,
        CompanyModule,
        SearchModule,
        LoginModule,
        ProfileModule,
        RoutingModule,
        HttpClientModule,
        RegisterModule,
        FormsModule
    ],
    providers: [
        DialogService,
        FlashMessagesService,
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
