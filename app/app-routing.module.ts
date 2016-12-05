import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }        from './components/home/home.component';
import { LoginComponent }       from './components/login/login.component';
import { RegisterComponent }    from './components/register/register.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: HomeComponent },
    { path: 'get-started', component: HomeComponent },
    { path: 'docs', component: HomeComponent },
    { path: 'account', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AppRoutingModule {

}