import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { Routes, RouterModule}  from '@angular/router';
import { FormsModule }          from '@angular/forms';
// import { HttpModule }           from '@angular/http';
// import { Ng2PageScrollModule }  from 'ng2-page-scroll/ng2-page-scroll';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }         from './app.component';

// import { UsersService }         from './services/users.service';
import { Auth } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { SiteModule } from './site/site.module'
import { UsersModule } from './users/users.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        SiteModule,
        UsersModule
        // Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [Auth, AUTH_PROVIDERS ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
