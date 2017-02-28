import { NgModule }      from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// import { AUTH_PROVIDERS } from 'angular2-jwt';

// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';

// import { Auth } from './services/auth.service';
// import { AuthWRT } from './services/my-auth.service';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home.component';
import { PageNotFoundComponent } from './components/pagenotfound.component';

const defaultRoutes: Routes = [
  {
        path: 'home',
        component: HomeComponent
    },
    { 
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(defaultRoutes)],
  declarations: [ AppComponent, HomeComponent, PageNotFoundComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
