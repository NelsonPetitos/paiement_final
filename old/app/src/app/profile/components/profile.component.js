"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProfileComponent = (function () {
    function ProfileComponent() {
        this.selectedLink = '';
    }
    ProfileComponent.prototype.setSelectedLink = function (link) {
        this.selectedLink = link;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        template: "\n    <div class=\"container\" style=\"padding-top: 30px;\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <ol class=\"breadcrumb\">\n                    <li><a [routerLink]=\"['/profile']\" (click)=\"setSelectedLink('')\">Profile</a></li>\n                    <li *ngIf=\"selectedLink!==''\" class=\"active\">{{selectedLink}}</li>\n                </ol>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-3\">\n                <ul class=\"nav nav-pills nav-stacked\">\n                    <li role=\"presentation\" ><a (click)=\"setSelectedLink('Edit')\"><span class=\"glyphicon glyphicon-lock\"></span>&nbsp;&nbsp;&nbsp;Edit profile</a></li>\n                    <li role=\"presentation\"><a (click)=\"setSelectedLink('Logs')\"><span class=\"glyphicon glyphicon-list-alt\"></span>&nbsp;&nbsp;&nbsp;Logs</a></li>\n                    <li role=\"presentation\"><a (click)=\"setSelectedLink('Payments')\"><span class=\"glyphicon glyphicon-shopping-cart\"></span>&nbsp;&nbsp;&nbsp;Payments</a></li>\n                    <li role=\"presentation\"><a (click)=\"setSelectedLink('Clients')\"><span class=\"glyphicon glyphicon-user\"></span>&nbsp;&nbsp;&nbsp;Clients</a></li>\n                    <li role=\"presentation\"><a (click)=\"setSelectedLink('Accounts')\"><span class=\"glyphicon glyphicon-edit\"></span>&nbsp;&nbsp;&nbsp;Manage accounts</a></li>\n                    <li role=\"presentation\"><a (click)=\"setSelectedLink('Cashiers')\"><span class=\"glyphicon glyphicon-phone\"></span>&nbsp;&nbsp;&nbsp;Manage cashiers</a></li>\n                </ul>\n            </div>\n            <div class=\"col-md-8\" style=\"text-align:center;\">\n                <router-outlet></router-outlet>\n            </div>\n        </div>\n    </div>"
    })
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map