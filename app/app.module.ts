import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { Routes, RouterModule}  from '@angular/router';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { Ng2PageScrollModule }  from 'ng2-page-scroll/ng2-page-scroll';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }         from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UsersService }         from './services/users.service';
import { Auth } from './services/auth.service';
import { AppRouting } from './routes/app.routing';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouting,
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        AppComponent, 
        HomeComponent,
        ProfileComponent
    ],
    providers: [Auth, AUTH_PROVIDERS ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
