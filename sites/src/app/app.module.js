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
// import { AUTH_PROVIDERS } from 'angular2-jwt';
// import { DocumentationModule } from './documentation/documentation.module';
// import { ProfileModule } from './profile/profile.module';
// import { Auth } from './services/auth.service';
var my_auth_service_1 = require('./services/my-auth.service');
var app_component_1 = require('./app.component');
var home_component_1 = require('./components/home.component');
var pagenotfound_component_1 = require('./components/pagenotfound.component');
var defaultRoutes = [
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
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(defaultRoutes)],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, pagenotfound_component_1.PageNotFoundComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [my_auth_service_1.AuthWRT]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map