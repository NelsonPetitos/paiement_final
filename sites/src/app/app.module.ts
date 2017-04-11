import { NgModule }      from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// import { AUTH_PROVIDERS } from 'angular2-jwt';

// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';

// import { Auth } from './services/auth.service';
import { AuthWRT } from './services/my-auth.service';
import { AuthGuard } from './services/guard.service';
import { UsersService } from './services/users.service'
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { AppComponent }  from './app.component';
import { CircleLoaderComponent } from './loaders/circle-loader.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/error/pagenotfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/profile/details/details.component';
import { ApiReferenceComponent } from './components/apireference/apireference.component';
import { LogsComponent } from './components/profile/logs/logs.component';
import { PaymentsComponent } from './components/profile/payments/payments.component';
import { ClientsComponent } from './components/profile/clients/clients.component';

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
            },
            {
                path: 'logs',
                component: LogsComponent
            },
            // {
            //     path: 'change-pwd',
            //     component: ChangePwdComponent
            // },
            // {
            //     path: 'manage-cashiers',
            //     component: ManageCashiersComponent
            // },
            // {
            //     path: 'manage-adress',
            //     component: ManageAdressComponent
            // },
            // {
            //     path: 'manage-account',
            //     component: ManageAccountComponent
            // },
            {
                path: 'payments',
                component: PaymentsComponent
            },
            {
                path: 'clients',
                component: ClientsComponent
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
  imports: [ HttpModule, BrowserModule, RouterModule.forRoot(defaultRoutes), Ng2PageScrollModule.forRoot()],
  declarations: [ AppComponent, HomeComponent, PageNotFoundComponent, ProfileComponent, DetailsComponent, CircleLoaderComponent,
                  ApiReferenceComponent, LogsComponent, ClientsComponent, PaymentsComponent
                ],
  bootstrap:    [ AppComponent ],
  providers: [ AuthWRT, AuthGuard, UsersService ]
})
export class AppModule {}
