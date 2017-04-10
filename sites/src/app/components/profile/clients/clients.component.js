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
var users_service_1 = require('../../../services/users.service');
var ClientsComponent = (function () {
    function ClientsComponent(usersService) {
        this.usersService = usersService;
        this.showLoader = true;
    }
    ClientsComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
    };
    ClientsComponent = __decorate([
        core_1.Component({
            template: "\n    <h1>Clients list</h1>\n    \n    <div style=\"margin-top: 34px;\"><circle-loader *ngIf=\"showLoader\" role=\"alert\"></circle-loader></div>\n\n    <div *ngIf=\"!showLoader\" class=\"table-responsive\">\n        <table class=\"table table-hover\">\n            <tr>\n                <td>Num</td>\n                <td>Number</td>\n            <tr>\n            <tr *ngFor=\"let transaction of transactions\">\n                <td>#</td>\n                <td>{{transaction}}</td>\n            </tr>\n            <tr *ngIf=\"transactions.length == 0\">\n                <td colspan=\"3\"><h2 style=\"text-align: center;\">No clients.</h2></td>\n            </tr>\n        </table>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;
//# sourceMappingURL=clients.component.js.map