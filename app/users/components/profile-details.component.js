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
var auth_service_1 = require('../../services/auth.service');
var users_service_1 = require('../../services/users.service');
var ProfileDetailsComponent = (function () {
    function ProfileDetailsComponent(auth, usersService) {
        this.auth = auth;
        this.usersService = usersService;
        this.userId = '';
        this.apikey = "xxx-xxxx-xxxxx-xxx";
    }
    ProfileDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.userId = this.profile.user_id.split("|")[1];
        this.usersService.getUser(this.userId).then(function (data) {
            if (!data.err) {
                console.log("Apikey find");
                _this.apikey = data.data.apikey;
            }
        }, function (err) {
            console.log(err);
        });
    };
    ProfileDetailsComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"row\" style=\"margin-bottom: 30px;\">\n            <img class=\"img-circle\" src=\"{{profile.picture}}\">\n        </div>\n        <div class=\"row\">\n            <div class=\"panel panel-primary\">\n                <div class=\"panel-heading\">{{profile.nickname}} profile details</div>\n                <div class=\"panel-body\">\n                    <table class=\"table table-striped\">\n                        <tr>\n                            <td>Api key : </td>\n                            <td>{{apikey}}</td>\n                        </tr>\n                        <tr>\n                            <td>Email : </td>\n                            <td>{{profile.email}}</td>\n                        </tr>\n                        <tr>\n                            <td>Created at : </td>\n                            <td>{{profile.created_at}}</td>\n                        </tr>\n                        <tr>\n                            <td>Modified at : </td>\n                            <td>{{profile.updated_at}}</td>\n                        </tr>\n                        <tr>\n                            <td>Address (es) : </td>\n                            <td [routerLink]=\"['/manage-adress']\">See manage adresses</td>\n                        </tr>\n                        <tr>\n                            <td>Account (s) : </td>\n                            <td [routerLink]=\"['/manage-account']\">See manage accounts</td>\n                        </tr>\n                    </table>\n                </div>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth, users_service_1.UsersService])
    ], ProfileDetailsComponent);
    return ProfileDetailsComponent;
}());
exports.ProfileDetailsComponent = ProfileDetailsComponent;
//# sourceMappingURL=profile-details.component.js.map