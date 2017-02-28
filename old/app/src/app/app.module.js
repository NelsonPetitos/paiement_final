"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var angular2_jwt_1 = require("angular2-jwt");
var documentation_module_1 = require("./documentation/documentation.module");
var profile_module_1 = require("./profile/profile.module");
var auth_service_1 = require("./services/auth.service");
var my_auth_service_1 = require("./services/my-auth.service");
var app_component_1 = require("./app.component");
var defaultRoutes = [];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(defaultRoutes),
            profile_module_1.ProfileModule, documentation_module_1.DocumentationModule],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [angular2_jwt_1.AUTH_PROVIDERS, auth_service_1.Auth, my_auth_service_1.AuthWRT]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map