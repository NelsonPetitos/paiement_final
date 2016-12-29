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
            template: "\n        <div class=\"container\" style=\"padding-top: 30px;\">\n            <div class=\"col-md-3\">\n                <ul class=\"nav nav-pills nav-stacked\">\n                    <li role=\"presentation\"><a [routerLink]=\"['/profile']\"><span class=\"glyphicon glyphicon-info-sign\"></span>&nbsp;&nbsp;&nbsp;Profile info</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['logs']\"><span class=\"glyphicon glyphicon-list-alt\"></span>&nbsp;&nbsp;&nbsp;Logs</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['payments']\"><span class=\"glyphicon glyphicon-shopping-cart\"></span>&nbsp;&nbsp;&nbsp;Payments</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['clients']\"><span class=\"glyphicon glyphicon-user\"></span>&nbsp;&nbsp;&nbsp;Clients</a></li>\n                    <li role=\"presentation\" ><a [routerLink]=\"['change-pwd']\"><span class=\"glyphicon glyphicon-lock\"></span>&nbsp;&nbsp;&nbsp;Change password</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['manage-adress']\"><span class=\"glyphicon glyphicon-level-up\"></span>&nbsp;&nbsp;&nbsp;Manage adresses</a></li>\n                    <li role=\"presentation\"><a [routerLink]=\"['manage-account']\"><span class=\"glyphicon glyphicon-edit\"></span>&nbsp;&nbsp;&nbsp;Manage accounts</a></li>\n                </ul>\n            </div>\n            <div class=\"col-md-8\" style=\"text-align:center;\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map