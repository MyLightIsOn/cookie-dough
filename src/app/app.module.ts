import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing/routing.module';
import { CompanyModule } from './companies/company.module';
import { AdminModule } from "./admin/admin.module";
import { LoginComponent } from "./login/login.component";
import { LoginRoutingModule } from "./login/login-routing.module";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

import { DialogService } from './dialog.service';

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        RegisterComponent,
        PageNotFoundComponent,
        ComposeMessageComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        CompanyModule,
        AdminModule,
        LoginRoutingModule,
        RoutingModule
    ],
    providers: [
        DialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
