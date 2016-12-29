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
var ProfileComponent = (function () {
    function ProfileComponent() {
    }
    ProfileComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"container\" style=\"padding-top: 30px;\">\n            <div class=\"col-md-3\">\n                <ul class=\"nav nav-pills nav-stacked\">\n                    <li role=\"presentation\"><a [routerLink]=\"['/profile']\">Profile info</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['logs']\">Logs</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['payments']\">Payments</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['clients']\">Clients</a></li>\n                    <li role=\"presentation\" ><a [routerLink]=\"['change-pwd']\">Change password</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['manage-adress']\">Manage adresses</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['manage-account']\">Manage accounts</a></li>\n                </ul>\n            </div>\n            <div class=\"col-md-8\" style=\"text-align:center;\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map