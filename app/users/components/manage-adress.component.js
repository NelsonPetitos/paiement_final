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
var ManageAdressComponent = (function () {
    function ManageAdressComponent(usersService, auth) {
        this.usersService = usersService;
        this.auth = auth;
        this.showForm = false;
        this.showLoader = true;
        this.saveLoading = false;
        this.showAlert = false;
        this.adresses = [];
        this.userId = '';
        this.deletionLoaderAdresstId = '';
        this.message = '';
        this.countries = [{ value: 'Cameroun', display: 'Cameroun' },
            { value: 'Gabon', display: "Gabon" },
            { value: "C\u00F4te d'ivoire", display: "C\u00F4te d'ivoire" },
            { value: 'Sénégal', display: "S\u00E9n\u00E9gal" }];
        this.codes = [{ value: '237', display: '+237' },
            { value: '123', display: "+123" },
            { value: '234', display: "+234" },
            { value: '567', display: "+567" }];
        this.defaultCode = '237';
        this.defaultCountry = 'Cameroun';
    }
    ManageAdressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1];
        this.usersService.getAdresses(this.userId).then(function (data) {
            _this.showLoader = false;
            if (!data.err) {
                console.log("Tout est ok");
                _this.adresses = data.data;
            }
        }, function (err) {
            console.log("une erreur c'est produite");
            _this.showLoader = false;
        });
        this.resetForm();
    };
    ManageAdressComponent.prototype.addAdress = function () {
        this.showForm = true;
    };
    ManageAdressComponent.prototype.onSubmit = function () {
        var _this = this;
        this.saveLoading = true;
        if (this.adress.phone === null || this.adress.phone.trim() === '' || this.adress.postalbox == null || this.adress.postalbox.trim() === '' || this.adress.country == null) {
            this.message = "AFill all required fields.";
            this.showAlert = true;
            this.resetAlert();
            return;
        }
        this.usersService.saveAdress(this.adress).then(function (data) {
            _this.saveLoading = false;
            _this.showForm = data.err;
            _this.message = data.msg;
            _this.showAlert = data.err;
            _this.resetAlert();
            if (!data.err) {
                _this.resetForm();
                _this.adresses[_this.adresses.length] = data.data;
            }
        }, function (err) {
            _this.saveLoading = false;
            console.log(err);
        });
    };
    ManageAdressComponent.prototype.deleteAdress = function (id) {
        var _this = this;
        this.deletionLoaderAdresstId = id;
        this.usersService.deleteAdress(id).then(function (data) {
            _this.deletionLoaderAdresstId = "";
            var tmp = [];
            var i = 0;
            if (!data.err) {
                for (var _i = 0, _a = _this.adresses; _i < _a.length; _i++) {
                    var adress = _a[_i];
                    if (adress._id != data.data._id) {
                        tmp[i] = adress;
                        i = i + 1;
                    }
                }
                _this.adresses = tmp;
            }
        }, function (err) {
            console.log(err);
            _this.deletionLoaderAdresstId = "";
        });
    };
    ManageAdressComponent.prototype.resetAlert = function () {
        var _this = this;
        setTimeout(function () {
            _this.saveLoading = false;
            _this.showAlert = false;
        }, 3000);
    };
    ManageAdressComponent.prototype.resetForm = function () {
        this.adress = { town: '', country: this.defaultCountry, postalbox: '', phone: '', street: '', user: this.userId, _id: '', code: this.defaultCode };
    };
    ManageAdressComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Manage Adress</h1>\n        <div *ngIf=\"!showLoader\" class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <tr>\n                    <td>Num</td>\n                    <td>Phone number</td>\n                    <td>Country</td>\n                    <td>City</td>\n                    <td>Rue</td>\n                    <td>Postal box</td>\n                    <td>Action</td>\n                <tr>\n                <tr *ngFor=\"let adress of adresses\">\n                    <td>#</td>  \n                    <td>(+{{adress.code}}){{adress.phone}}</td>\n                    <td>{{adress.country}}</td>\n                    <td>{{adress.town}}</td>\n                    <td>{{adress.street}}</td>\n                    <td>{{adress.postalbox}}</td>\n                    <td>\n                        <span *ngIf=\"deletionLoaderAdresstId !== adress._id\" (click)=\"deleteAdress(adress._id)\" class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n                        <bar-loader *ngIf=\"deletionLoaderAdresstId === adress._id\"></bar-loader>\n                    </td>\n                </tr>\n                <tr *ngIf=\"adresses.length == 0\">\n                    <td colspan=\"7\"><h2 style=\"text-align: center;\">No adresses.</h2></td>\n                </tr>\n            </table>\n        </div>\n\n\n        <circle-loader *ngIf=\"showLoader\"></circle-loader>\n\n\n        <div *ngIf=\"!showForm\" class=\"form-group\" style=\"margin-top: 30px;\">\n            <button (click)=\"addAdress()\" class=\"btn btn-primary\">Add new adress</button>\n        </div>\n\n\n        <div *ngIf=\"showForm\" class=\"jumbotron\" style=\"margin-bottom: 30px;\">\n            <div *ngIf=\"showAlert\" class=\"alert alert-danger\" role=\"alert\">{{message}}</div>\n            <form (ngSubmit)=\"onSubmit()\" class=\"form-horizontal\" #registerForm=\"ngForm\" >\n                <div class=\"form-group\">\n                    <div class=\"col-sm-2\">\n                        <select required class=\"form-control\" name=\"code\" [(ngModel)]=\"adress.code\">\n                            <option *ngFor=\"let code of codes\" [value]=\"code.value\">  \n                            {{code.display}}\n                            </option>\n                        </select>\n                    </div>\n                    <div class=\"col-sm-10\">\n                        <input [(ngModel)]=\"adress.phone\" type=\"phone\" class=\"form-control\" name=\"phone\" id=\"phone\" placeholder=\"T\u00E9lephone\" required />\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-sm-4\">\n                        <input [(ngModel)]=\"adress.postalbox\" type=\"text\" class=\"form-control\" name=\"postalbox\" id=\"postalbox\" placeholder=\"Boite postale\" />\n                    </div>\n                    <div class=\"col-sm-5\">\n                        <input [(ngModel)]=\"adress.town\" type=\"text\" class=\"form-control\" name=\"town\" id=\"town\" placeholder=\"Ville\" />\n                    </div>\n                    <div class=\"col-sm-3\">\n                        <select required class=\"form-control\" name=\"country\" [(ngModel)]=\"adress.country\">\n                            <option *ngFor=\"let country of countries\" [ngValue]=\"country.value\">  \n                            {{country.display}}\n                            </option>\n                        </select>\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <input [(ngModel)]=\"adress.street\" type=\"text\" class=\"form-control\" name=\"street\" id=\"street\" placeholder=\"Rue\" />\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button *ngIf=\"!saveLoading\" type=\"submit\" class=\"btn btn-primary\">Add adress</button>\n                        <circle-loader *ngIf=\"saveLoading\"></circle-loader>\n                    </div>\n                </div>\n            </form>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, auth_service_1.Auth])
    ], ManageAdressComponent);
    return ManageAdressComponent;
}());
exports.ManageAdressComponent = ManageAdressComponent;
//# sourceMappingURL=manage-adress.component.js.map