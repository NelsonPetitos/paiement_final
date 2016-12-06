import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { Routes, RouterModule}  from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { Ng2PageScrollModule}  from 'ng2-page-scroll/ng2-page-scroll';

import { HomeComponent }        from './components/home/home.component';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './components/login/login.component';
import { AccountComponent }     from './components/account/account.component';
import { RegisterComponent }    from './components/register/register.component';
import { UsersService }         from './services/users.service';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: HomeComponent },
    { path: 'get-started', component: HomeComponent },
    { path: 'account', component:  AccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent

    ],
    providers: [UsersService],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
