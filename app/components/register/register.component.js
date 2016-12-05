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
/**
 * Created by ndenelson on 01/12/2016.
 */
var core_1 = require('@angular/core');
var users_service_1 = require('../../services/users.service');
var RegisterComponent = (function () {
    function RegisterComponent(usersService) {
        this.usersService = usersService;
        this.user = {
            email: "",
            password: "",
            apikey: ""
        };
        this.isError = false;
    }
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.usersService.registerUser(this.user).then(function (data) {
            _this.isError = data.err;
            _this.errMsg = data.msg;
            if (!data.err) {
                console.log("il faut redirriger vers le compte");
            }
        }, function (err) {
            console.log(err);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            template: "\n        <section class=\"section\">\n            <div class=\"section-container\">\n                <div class=\"container\">\n                    <section style=\"padding-top: 90px;\" >\n                        <!--<div class=\"jumbotron\"  style=\"text-align: center;\">-->\n                            <!--<h1>Register</h1>-->\n                        <!--</div>-->\n                        <div *ngIf=\"isError\" class=\"alert alert-danger\" role=\"alert\">{{ errMsg }}</div>\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-offset-4 col-sm-4\">\n                                    <form (ngSubmit)=\"onSubmit()\" #registerForm=\"ngForm\">\n                                        <label for=\"email\" >Email</label>\n                                        <input type=\"email\" name=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.email\" required />\n                                        <br/>\n                                        <label for=\"password\">Password</label>\n                                        <input type=\"password\" name=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" [(ngModel)]=\"user.password\" required />\n                                        <br/>\n                                        <label for=\"confirm\">Confirm</label>\n                                        <input type=\"password\" name=\"confirm\" class=\"form-control\" id=\"confirm\" placeholder=\"Password again\"  [(ngModel)]=\"confirm\" required>\n                                        <br/>\n                                        <button type=\"submit\" class=\"btn btn-default btn-lg btn-block\" [disabled]=\"!registerForm.form.valid\" >Register</button>\n                                        \n                                        <br/>\n                                        <a routerLinkActive=\"active\" routerLink=\"/login\">Already member, login here</a> \n                                    </form>\n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n            </div>\n        </section>\n        "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map