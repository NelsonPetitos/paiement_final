import { NgModule }      from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// import { AUTH_PROVIDERS } from 'angular2-jwt';

// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';

// import { Auth } from './services/auth.service';
// import { AuthWRT } from './services/my-auth.service';

import { AppComponent }  from './app.component';

// const defaultRoutes: Routes = [];

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
