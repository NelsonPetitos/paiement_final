import { NgModule }      from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// import { AUTH_PROVIDERS } from 'angular2-jwt';

// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';

// import { Auth } from './services/auth.service';
import { AuthWRT } from './services/my-auth.service';
import { AuthGuard } from './services/guard.service';

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/error/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/profile/details/details.component';
import { ApiReferenceComponent } from './components/apireference/apireference.component';

// Define the routes
const defaultRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component : DetailsComponent,
            }
        ]
    },
    {
        path: 'api-reference',
        component: ApiReferenceComponent
    },
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

// Module and component related to this application
@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(defaultRoutes)],
  declarations: [ AppComponent, HomeComponent, PageNotFoundComponent, ProfileComponent, DetailsComponent,
                  ApiReferenceComponent
                ],
  bootstrap:    [ AppComponent ],
  providers: [ AuthWRT, AuthGuard ]
})
export class AppModule {}
