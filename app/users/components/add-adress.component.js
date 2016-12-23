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
var AddAdressComponent = (function () {
    function AddAdressComponent(usersService, auth) {
        this.usersService = usersService;
        this.auth = auth;
        this.showForm = false;
        this.showLoader = true;
        this.saveLoading = false;
        this.adresses = [];
        this.userId = '';
    }
    AddAdressComponent.prototype.ngOnInit = function () {
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
        this.adress = { town: '', country: '', postalbox: '', phone: '', street: '', user: this.userId, _id: '', };
    };
    AddAdressComponent.prototype.addAdress = function () {
        this.showForm = true;
    };
    AddAdressComponent = __decorate([
        core_1.Component({
            template: "\n        <h1>Manage Adress</h1>\n        <div *ngIf=\"!showLoader\" class=\"table-responsive\">\n            <table class=\"table table-hover\">\n                <tr>\n                    <td>Num</td>\n                    <td>Country</td>\n                    <td>City</td>\n                    <td>Rue</td>\n                    <td>Postal box</td>\n                    <td>Phone number</td>\n                    <td>Action</td>\n                <tr>\n                <tr *ngFor=\"let adress of adresses\">\n                    <td>#</td>  \n                    <td>{{adress.country}}</td>\n                    <td>{{adress.town}}</td>\n                    <td>{{adress.street}}</td>\n                    <td>{{adress.postalbox}}</td>\n                    <td>{{adress.phone}}</td>\n                    <td>\n                        <span (click)=\"setDefault(adress._id)\" class=\"glyphicon glyphicon-unchecked\" aria-hidden=\"true\"></span>&nbsp;&nbsp;&nbsp;\n                        <span (click)=\"deleteAccount(adress._id)\" class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n                    </td>\n                </tr>\n                <tr *ngIf=\"adresses.length == 0\">\n                    <td colspan=\"7\"><h2 style=\"text-align: center;\">No adresses.</h2></td>\n                </tr>\n            </table>\n        </div>\n\n\n        <my-loader *ngIf=\"showLoader\"></my-loader>\n\n\n        <div *ngIf=\"!showForm\" class=\"form-group\" style=\"margin-top: 30px;\">\n            <button (click)=\"addAdress()\" class=\"btn btn-primary\">Add new adress</button>\n        </div>\n\n\n        <div *ngIf=\"showForm\" class=\"form-group\" style=\"margin-bottom: 30px;\">\n            <form class=\"form-horizontal\">\n                <div class=\"form-group\">\n                    <div class=\"col-sm-2\">\n                        <select name=\"code\" >\n                            <option value=\"1\">+237</option>\n                            <option value=\"2\">+222</option>\n                            <option value=\"3\">+111</option>\n                            <option value=\"4\">+333</option>\n                        </select>\n                    </div>\n                    <div class=\"col-sm-10\">\n                        <input type=\"text\" class=\"form-control\" name=\"\" id=\"\" placeholder=\"T\u00E9lephone\" />\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-sm-4\">\n                    <input type=\"text\" class=\"form-control\" name=\"\" id=\"\" placeholder=\"Boite postale\" />\n                    </div>\n                    <div class=\"col-sm-5\">\n                    <input type=\"text\" class=\"form-control\" name=\"\" id=\"\" placeholder=\"Ville\" />\n                    </div>\n                    <div class=\"col-sm-3\">\n                        <select name=\"contry\">\n                            <option value=\"1\">Cameroun</option>\n                            <option value=\"2\">Togo</option>\n                            <option value=\"3\">Gabon</option>\n                            <option value=\"4\">Cote d'ivoire</option>\n                        </select>\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" name=\"\" id=\"\" placeholder=\"Rue\" />\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-sm-offset-2 col-sm-10\">\n                        <button class=\"btn btn-primary\">Add adress</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, auth_service_1.Auth])
    ], AddAdressComponent);
    return AddAdressComponent;
}());
exports.AddAdressComponent = AddAdressComponent;
//# sourceMappingURL=add-adress.component.js.map