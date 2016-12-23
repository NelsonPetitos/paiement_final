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
var ChangePwdComponent = (function () {
    function ChangePwdComponent(usersService, auth) {
        this.usersService = usersService;
        this.auth = auth;
        this.message = "Test de message pour l'alert";
        this.displayAlertError = false;
        this.displayAlertSucess = false;
        this.data = { oldPassword: '', password: '', confirmPassword: '', user: '' };
        this.userId = '';
        this.saveLoading = false;
    }
    ChangePwdComponent.prototype.onSubmit = function () {
        var _this = this;
        this.saveLoading = true;
        this.displayAlertError = false;
        this.displayAlertSucess = false;
        if (this.data.password !== this.data.confirmPassword || this.data.password == '' || this.data.confirmPassword == '' || this.data.oldPassword == '') {
            this.displayAlertError = true;
            this.message = "Password not matching or empty.";
            this.saveLoading = false;
        }
        else {
            this.usersService.changePassword(this.data).then(function (data) {
                _this.saveLoading = false;
                _this.message = data.msg;
                _this.displayAlertError = data.err;
                _this.displayAlertSucess = !data.err;
                _this.data = { oldPassword: '', password: '', confirmPassword: '', user: _this.userId };
            }, function (err) {
                console.log(err);
                _this.saveLoading = false;
                _this.displayAlertError = true;
                _this.displayAlertSucess = false;
                _this.message = "An error occur. Password not change.";
                _this.data = { oldPassword: '', password: '', confirmPassword: '', user: _this.userId };
            });
        }
    };
    ChangePwdComponent.prototype.ngOnInit = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.data.user = this.profile.user_id.split("|")[1];
        this.userId = this.profile.user_id.split("|")[1];
    };
    ChangePwdComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Change password </h1>\n        <div *ngIf=\"displayAlertError\" class=\"alert alert-danger\" role=\"alert\">{{message}}</div>\n        <div *ngIf=\"displayAlertSucess\" class=\"alert alert-success\" role=\"alert\">{{message}}</div>\n        <form (ngSubmit)=\"onSubmit()\" #registerForm=\"ngForm\" class=\"form-horizontal\">\n            <div class=\"form-group\">\n                <input [(ngModel)]=\"data.oldPassword\" type=\"password\" class=\"form-control\" name=\"oldPassword\" id=\"oldPassword\" placeholder=\"Old password\" required>\n            </div>\n            <div class=\"form-group\">\n                <input [(ngModel)]=\"data.password\" type=\"password\" class=\"form-control\" name=\"newPassword\" id=\"newPassword\" placeholder=\"New password\" required>\n            </div>\n            <div class=\"form-group\">\n                <input [(ngModel)]=\"data.confirmPassword\" type=\"password\" class=\"form-control\" name=\"confirmPassword\" id=\"confirmPassword\" placeholder=\"Confirm password\" required>\n            </div>\n            <div *ngIf=\"!saveLoading\" class=\"form-group\">\n                <div class=\"col-sm-12\">\n                    <button type=\"submit\" class=\"btn btn-primary\">Change password</button>\n                </div>\n            </div>\n        </form>\n        <my-loader *ngIf=\"saveLoading\"></my-loader>\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, auth_service_1.Auth])
    ], ChangePwdComponent);
    return ChangePwdComponent;
}());
exports.ChangePwdComponent = ChangePwdComponent;
//# sourceMappingURL=change-pwd.component.js.map