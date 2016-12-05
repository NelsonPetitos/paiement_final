import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { Routes, RouterModule}  from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeComponent }        from './components/home/home.component';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './components/login/login.component';
import { RegisterComponent }    from './components/register/register.component';
import { UsersService }         from './services/users.service';

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
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent

    ],
    providers: [UsersService],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
