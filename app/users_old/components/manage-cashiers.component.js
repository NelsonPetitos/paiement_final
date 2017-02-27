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
var ManageCashiersComponent = (function () {
    function ManageCashiersComponent(userService, auth) {
        this.userService = userService;
        this.auth = auth;
        this.showTableDataLoader = true;
        this.showForm = false;
        this.showAlertMessage = false;
        this.saveLoader = false;
    }
    ManageCashiersComponent.prototype.addCashier = function () {
        this.showForm = true;
    };
    ManageCashiersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1];
        this.resetForm();
        this.userService.getCashier(this.userId).then(function (data) {
            _this.showTableDataLoader = false;
            if (!data.err) {
                _this.cashiers = data.data;
            }
        }, function (err) {
            console.log(err);
            _this.showTableDataLoader = false;
        });
    };
    ManageCashiersComponent.prototype.verifiedCashier = function () {
        return (this.cashier.phone == null || this.cashier.phone.trim() == '' || this.cashier.name == null || this.cashier.name.trim() == '' || this.cashier.code == null);
    };
    ManageCashiersComponent.prototype.onSubmit = function () {
        console.log('Je suis dans le onsubmit');
        this.saveLoader = true;
        if (this.verifiedCashier() == true) {
            this.message = "Fill all required fields.";
            this.showAlertMessage = true;
            this.resetAlert();
        }
        else {
            console.log('Test is ok');
            console.log(this.cashier);
            this.userService.saveCashier(this.cashier).then(function (data) {
                console.log(data);
                this.saveLoader = false;
                this.showForm = false;
                if (!data.err) {
                    console.log("Enregistrememnt ok");
                    this.cashiers[this.cashiers.length] = data.data;
                }
            }, function (err) {
                console.log('Error occur');
            });
        }
    };
    ManageCashiersComponent.prototype.resetForm = function () {
        this.cashier = { name: "", adress: "", email: "", phone: "", code: 0, user: "", _id: "" };
        var min = 10000;
        var max = 99999;
        this.cashier.code = Math.floor(Math.random() * (max - min + 1)) + min;
        this.cashier.user = this.userId;
    };
    ManageCashiersComponent.prototype.resetAlert = function () {
        var _this = this;
        setTimeout(function () {
            _this.saveLoader = false;
            _this.showAlertMessage = false;
        }, 3000);
    };
    ManageCashiersComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Manage cashiers</h1>\n        <circle-loader *ngIf=\"showTableDataLoader\" role=\"alert\"></circle-loader>\n\n        <div *ngIf=\"!showTableDataLoader\" class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <tr>\n                    <td>Num</td>\n                    <td>Name</td>\n                    <td>Phone number</td>\n                    <td>Action</td>\n                <tr>\n                <tr *ngFor=\"let cashier of cashiers\">\n                    <td>#</td>  \n                    <td>{{cashier.name}}</td>\n                    <td>{{cashier.phone}}</td>\n                    <td>\n                        <span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n                    </td>\n                </tr>\n                <tr *ngIf=\"cashiers.length == 0\">\n                    <td colspan=\"5\"><h2 style=\"text-align: center;\">No cashiers</h2></td>\n                </tr>\n            </table>\n        </div>\n\n\n        <div *ngIf=\"!showForm\" class=\"form-group\" style=\"margin-top: 30px;\">\n            <button (click)=\"addCashier()\" class=\"btn btn-primary\">Add new cashier</button>\n        </div>\n\n        <div *ngIf=\"showForm\" class=\"jumbotron\" style=\"margin-bottom: 30px;\">\n            <div *ngIf=\"showAlertMessage\" class=\"alert alert-danger\" role=\"alert\">{{message}}</div>\n            <form (ngSubmit)=\"onSubmit()\" class=\"form-horizontal\" #registerForm=\"ngForm\" >\n                <div class=\"form-group\">\n                    <label for=\"name\" class=\"col-sm-3 control-label\">Name</label>\n                    <div class=\"col-sm-6\">\n                        <input [(ngModel)]=\"cashier.name\" type=\"text\" class=\"form-control\" name=\"name\" id=\"name\" placeholder=\"Name\" required>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"adress\" class=\"col-sm-3 control-label\">Adress</label>\n                    <div class=\"col-sm-6\">\n                        <input [(ngModel)]=\"cashier.adress\" type=\"text\" class=\"form-control\" name=\"adress\" id=\"adress\" placeholder=\"Adress\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"email\" class=\"col-sm-3 control-label\">Em@il</label>\n                    <div class=\"col-sm-6\">\n                        <input [(ngModel)]=\"cashier.email\" type=\"text\" class=\"form-control\" name=\"email\" id=\"email\" placeholder=\"Em@il adress\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"phone\" class=\"col-sm-3 control-label\">Phone number</label>\n                    <div class=\"col-sm-6\">\n                        <input [(ngModel)]=\"cashier.phone\" type=\"text\" class=\"form-control\" name=\"phone\" id=\"phone\" placeholder=\"Phone number\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"code\" class=\"col-sm-3 control-label\">Cashier code</label>\n                    <div class=\"col-sm-6\">\n                        <input [(ngModel)]=\"cashier.code\" type=\"text\" class=\"form-control\" name=\"code\" id=\"code\" placeholder=\"Secret code\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button *ngIf=\"!saveLoader\" type=\"submit\" class=\"btn btn-primary\">Create cashier</button>\n                        <bar-loader *ngIf=\"saveLoader\"></bar-loader>\n                    </div>\n                </div>\n            </form>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof users_service_1.UsersService !== 'undefined' && users_service_1.UsersService) === 'function' && _a) || Object, auth_service_1.Auth])
    ], ManageCashiersComponent);
    return ManageCashiersComponent;
    var _a;
}());
exports.ManageCashiersComponent = ManageCashiersComponent;
//# sourceMappingURL=manage-cashiers.component.js.map