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
var users_service_1 = require('../../services/users.service');
var auth_service_1 = require('../../services/auth.service');
var ManageAccountComponent = (function () {
    function ManageAccountComponent(usersService, auth) {
        this.usersService = usersService;
        this.auth = auth;
        this.showForm = false;
        this.showLoader = true;
        this.saveLoading = false;
        this.showAlert = false;
        this.accounts = [];
        this.index = 1;
        this.defaultAccountID = '';
        this.deletionLoderAccountId = "";
        this.message = '';
    }
    ManageAccountComponent.prototype.setDefault = function (id) {
        console.log(id);
        this.defaultAccountID = id;
        //make some update in the database.
    };
    ManageAccountComponent.prototype.deleteAccount = function (id) {
        var _this = this;
        this.deletionLoderAccountId = id;
        this.usersService.deleteAccount(id).then(function (data) {
            _this.deletionLoderAccountId = "";
            var tmp = [];
            var i = 0;
            if (!data.err) {
                console.log("Supression Ok");
                for (var _i = 0, _a = _this.accounts; _i < _a.length; _i++) {
                    var account = _a[_i];
                    if (account._id != data.data._id) {
                        tmp[i] = account;
                        i = i + 1;
                    }
                }
                _this.accounts = tmp;
            }
        }, function (err) {
            console.log(err);
            _this.deletionLoderAccountId = "";
        });
    };
    ManageAccountComponent.prototype.onSubmit = function () {
        var _this = this;
        this.saveLoading = true;
        if (this.account.num === null || this.account.num.trim() === '') {
            this.message = "Account number empty.";
            this.showAlert = true;
            setTimeout(function () { _this.resetAlert(); }, 3000);
            return;
        }
        this.usersService.saveAccount(this.account).then(function (data) {
            _this.saveLoading = false;
            _this.account.num = '';
            _this.showForm = false;
            if (!data.err) {
                console.log("Enregistrememnt ok");
                _this.accounts[_this.accounts.length] = data.data;
            }
        }, function (err) {
            _this.saveLoading = false;
            console.log(err);
        });
    };
    ManageAccountComponent.prototype.addAccount = function () {
        this.showForm = true;
    };
    ManageAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1];
        this.usersService.getAccount(this.userId).then(function (data) {
            _this.showLoader = false;
            if (!data.err) {
                console.log("Tout est ok");
                _this.accounts = data.data;
            }
        }, function (err) {
            console.log(err);
            console.log("une erreur c'est produite");
            _this.showLoader = false;
        });
        this.account = { user: this.userId, num: '', _id: '' };
    };
    ManageAccountComponent.prototype.resetAlert = function () {
        this.saveLoading = false;
        this.showAlert = false;
    };
    ManageAccountComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Manage accounts</h1>\n\n        <circle-loader *ngIf=\"showLoader\" role=\"alert\"></circle-loader>\n\n        <div *ngIf=\"!showLoader\" class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <tr>\n                <td>Num</td>\n                    <td>Account Number</td>\n                    <td>Action</td>\n                <tr>\n                <tr *ngFor=\"let account of accounts\">\n                    <td>#</td>\n                    <td>{{account.num}}</td>\n                    <td>\n                        <span *ngIf=\"account._id === defaultAccountID\" (click)=\"setDefault(account._id)\" class=\"glyphicon glyphicon-check\" aria-hidden=\"true\"></span>\n                        <span *ngIf=\"account._id !== defaultAccountID\" (click)=\"setDefault(account._id)\" class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\"></span>\n                        &nbsp;&nbsp;&nbsp;\n                        <span *ngIf=\"deletionLoderAccountId !== account._id\" (click)=\"deleteAccount(account._id)\" class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n                        <bar-loader *ngIf=\"deletionLoderAccountId === account._id\"></bar-loader>\n                    </td>\n                </tr>\n                <tr *ngIf=\"accounts.length == 0\">\n                    <td colspan=\"3\"><h2 style=\"text-align: center;\">No accounts.</h2></td>\n                </tr>\n            </table>\n        </div>\n\n        <div *ngIf=\"!showForm\" class=\"form-group\" style=\"margin-top: 30px;\">\n            <button (click)=\"addAccount()\" class=\"btn btn-primary\">Add new account</button>\n        </div>\n\n        \n\n        <div *ngIf=\"showForm\" class=\"jumbotron\" style=\"margin-bottom: 30px;\">\n            <div *ngIf=\"showAlert\" class=\"alert alert-danger\" role=\"alert\">{{message}}</div>\n            <form (ngSubmit)=\"onSubmit()\" #registerForm=\"ngForm\" class=\"form-horizontal\">\n                <div class=\"form-group\">\n                    <input type=\"text\" [(ngModel)]=\"account.num\" class=\"form-control\" id=\"account\" placeholder=\"Account number\" name=\"num\" required>\n                </div>\n                <div class=\"form-group\">\n                    <button *ngIf=\"!saveLoading\" type=\"submit\" class=\"btn btn-primary\">Add</button>\n                    <circle-loader *ngIf=\"saveLoading\"></circle-loader>\n                </div>\n            </form>\n        </div>\n\n        \n\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, auth_service_1.Auth])
    ], ManageAccountComponent);
    return ManageAccountComponent;
}());
exports.ManageAccountComponent = ManageAccountComponent;
//# sourceMappingURL=manage-account.component.js.map