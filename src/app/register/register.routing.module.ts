import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterVerifyComponent } from './register-verify/register-verify.component';

const registerRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'register-verify/:id', component: RegisterVerifyComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(registerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RegisterRoutingModule {}
