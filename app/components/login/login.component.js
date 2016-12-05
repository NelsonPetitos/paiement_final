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
var LoginComponent = (function () {
    function LoginComponent(usersService) {
        this.usersService = usersService;
        this.user = {
            email: '',
            password: '',
            apikey: ''
        };
        this.remember = true;
    }
    LoginComponent.prototype.onSubmit = function () {
        this.usersService.loginUser(this.user);
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n        \n            <!-- Intro Section -->\n            <section style=\"padding-top: 90px;\">\n                <div class=\"jumbotron\" style=\"text-align: center;\">\n                    <h1>Sign in</h1>\n                </div>\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-offset-4 col-sm-4    \">\n                            <form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\">\n                              <label for=\"email\" >Email</label>\n                              <input type=\"email\" name=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.email\" required #test>\n                               <br/> \n                              <label for=\"password\">Password</label>\n                              <input type=\"password\" name=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" [(ngModel)]=\"user.password\" required>\n                              <br/>\n                              <input name=\"remember\" type=\"checkbox\" [(ngModel)]=\"remember\"> Remember me\n                              <br/><br/>\n                              <button type=\"submit\" class=\"btn btn-default btn-lg btn-block\" [disabled]=\"!loginForm.form.valid\" >Sign in</button>\n                              \n                              <button class=\"btn btn-primary btn-lg btn-block\">Login with Facebook</button>\n                              <br/>\n                              <a routerLinkActive=\"active\" routerLink=\"/register\">Not yet member, register here</a>\n                            </form>\n            \n                        </div>\n                    </div>\n                </div>\n            </section>\n        \n        "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map