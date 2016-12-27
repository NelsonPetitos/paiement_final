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
var profile_component_1 = require('./components/profile.component');
var profile_details_component_1 = require('./components/profile-details.component');
var change_pwd_component_1 = require('./components/change-pwd.component');
var manage_account_component_1 = require('./components/manage-account.component');
var manage_adress_component_1 = require('./components/manage-adress.component');
var usersRoutes = [
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        children: [
            {
                path: '',
                component: profile_details_component_1.ProfileDetailsComponent,
            },
            {
                path: 'change-pwd',
                component: change_pwd_component_1.ChangePwdComponent
            },
            {
                path: 'manage-adress',
                component: manage_adress_component_1.ManageAdressComponent
            },
            {
                path: 'manage-account',
                component: manage_account_component_1.ManageAccountComponent
            }
        ]
    }
];
var UsersRoutingModule = (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(usersRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;
//# sourceMappingURL=users-routing.module.js.map