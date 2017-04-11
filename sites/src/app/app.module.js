"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
// import { AUTH_PROVIDERS } from 'angular2-jwt';
// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';
// import { Auth } from './services/auth.service';
var my_auth_service_1 = require('./services/my-auth.service');
var guard_service_1 = require('./services/guard.service');
var users_service_1 = require('./services/users.service');
var ng2_page_scroll_1 = require('ng2-page-scroll');
var app_component_1 = require('./app.component');
var circle_loader_component_1 = require('./loaders/circle-loader.component');
var home_component_1 = require('./components/home/home.component');
var pagenotfound_component_1 = require('./components/error/pagenotfound.component');
var profile_component_1 = require('./components/profile/profile.component');
var details_component_1 = require('./components/profile/details/details.component');
var apireference_component_1 = require('./components/apireference/apireference.component');
var logs_component_1 = require('./components/profile/logs/logs.component');
var payments_component_1 = require('./components/profile/payments/payments.component');
var clients_component_1 = require('./components/profile/clients/clients.component');
// Define the routes
var defaultRoutes = [
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        canActivate: [guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                component: details_component_1.DetailsComponent,
            },
            {
                path: 'logs',
                component: logs_component_1.LogsComponent
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
                component: payments_component_1.PaymentsComponent
            },
            {
                path: 'clients',
                component: clients_component_1.ClientsComponent
            }
        ]
    },
    {
        path: 'api-reference',
        component: apireference_component_1.ApiReferenceComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: pagenotfound_component_1.PageNotFoundComponent
    }
];
// Module and component related to this application
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule, platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(defaultRoutes), ng2_page_scroll_1.Ng2PageScrollModule.forRoot()],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, pagenotfound_component_1.PageNotFoundComponent, profile_component_1.ProfileComponent, details_component_1.DetailsComponent, circle_loader_component_1.CircleLoaderComponent,
                apireference_component_1.ApiReferenceComponent, logs_component_1.LogsComponent, clients_component_1.ClientsComponent, payments_component_1.PaymentsComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [my_auth_service_1.AuthWRT, guard_service_1.AuthGuard, users_service_1.UsersService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map