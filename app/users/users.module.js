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
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var users_service_1 = require('../services/users.service');
var auth_service_1 = require('../services/auth.service');
var users_routing_module_1 = require('./users-routing.module');
var profile_component_1 = require('./components/profile.component');
var profile_details_component_1 = require('./components/profile-details.component');
var change_pwd_component_1 = require('./components/change-pwd.component');
var add_adress_component_1 = require('./components/add-adress.component');
var manage_account_component_1 = require('./components/manage-account.component');
var loader_component_1 = require('../loader.component');
var UsersModule = (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                users_routing_module_1.UsersRoutingModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                common_1.CommonModule
            ],
            declarations: [
                profile_component_1.ProfileComponent,
                profile_details_component_1.ProfileDetailsComponent,
                change_pwd_component_1.ChangePwdComponent,
                manage_account_component_1.ManageAccountComponent,
                add_adress_component_1.AddAdressComponent,
                loader_component_1.LoaderComponent
            ],
            providers: [
                users_service_1.UsersService,
                auth_service_1.Auth
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map