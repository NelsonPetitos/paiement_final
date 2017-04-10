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
var LogsComponent = (function () {
    function LogsComponent(usersService) {
        this.usersService = usersService;
        this.showLoader = true;
        this.transactions = [];
    }
    LogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
        if (this.profile.apikey) {
            this.usersService.getLogs(this.profile.apikey).then(function (data) {
                console.log('Get transactions log');
                console.log(data);
                _this.showLoader = false;
                _this.transactions = data.data;
            }, function (err) {
                _this.showLoader = false;
                console.log(err);
                console.log('Error while getting logs');
            });
        }
    };
    LogsComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Transactions log</h1>\n        \n        <div style=\"margin-top: 34px;\"><circle-loader *ngIf=\"showLoader\" role=\"alert\"></circle-loader></div>\n\n        <div *ngIf=\"!showLoader\" class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <tr>\n                    <td>Transaction token</td>\n                    <td>Send on</td>\n                    <td>Number</td>\n                    <td>Amount</td>\n                    <td>Status finished</td>\n                <tr>\n                <tr *ngFor=\"let transaction of transactions\">\n                    <td>{{transaction.token_id}}</td>\n                    <td>{{transaction.date_init}}</td>\n                    <td>{{transaction.phone}}</td>\n                    <td>{{transaction.amount}}</td>\n                    <td>{{transaction.status_payment}}</td>\n                </tr>\n                <tr *ngIf=\"transactions.length == 0\">\n                    <td colspan=\"5\"><h2 style=\"text-align: center;\">No trasactions initiated.</h2></td>\n                </tr>\n            </table>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], LogsComponent);
    return LogsComponent;
}());
exports.LogsComponent = LogsComponent;
//# sourceMappingURL=logs.component.js.map