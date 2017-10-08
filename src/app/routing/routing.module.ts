import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from '../search/search.component';
import { RegisterComponent } from '../register/register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {path: 'search', component: SearchComponent},
    {path: 'register', component: RegisterComponent},
    { path: '',   redirectTo: '/search', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        )
    ],
    exports: [
        RouterModule],
    declarations: []
})
export class RoutingModule { }
