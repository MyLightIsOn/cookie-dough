import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from '../search/search.component';
import { RegisterComponent } from '../register/register.component';
import { ComposeMessageComponent } from "../compose-message/compose-message.component"
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {path: 'search', component: SearchComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
    {path: '',   redirectTo: '/search', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule],
    declarations: []
})
export class RoutingModule { }
