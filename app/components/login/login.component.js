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
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(usersService, router) {
        this.usersService = usersService;
        this.router = router;
        this.user = {
            email: '',
            password: '',
            apikey: ''
        };
        this.isError = false;
        this.errMsg = "test de message d'erreur";
        this.remember = true;
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.usersService.loginUser(this.user).then(function (data) {
            _this.isError = data.err;
            _this.errMsg = data.msg;
            if (!data.err) {
                console.log("login sucess !!!!");
                _this.router.navigate(['account']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.makeGet = function () {
        this.usersService.testGet().then(function (data) {
            console.log("Tout c'est bien passe dans le test " + data.email);
        }, function (err) {
            console.log("une erreur c'est produite");
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n        <section class=\"section\">\n            <div class=\"section-container\">\n                <div class=\"container\">\n                    <!-- Intro Section -->\n                    <section style=\"padding-top: 90px;\">\n                        <!--<div class=\"jumbotron\" style=\"text-align: center;\">-->\n                            <!--<h1>Sign in</h1>-->\n                        <!--</div>-->\n                        <div *ngIf=\"isError\" class=\"alert alert-danger\" role=\"alert\">{{errMsg}}</div>\n                        <div class=\"container\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-offset-4 col-sm-4    \">\n                                    <form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\">\n                                      <label for=\"email\" >Email</label>\n                                      <input type=\"email\" name=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.email\" required #test>\n                                       <br/> \n                                      <label for=\"password\">Password</label>\n                                      <input type=\"password\" name=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" [(ngModel)]=\"user.password\" required>\n                                      <br/>\n                                      <input name=\"remember\" type=\"checkbox\" [(ngModel)]=\"remember\"> Remember me\n                                      <br/><br/>\n                                      <button type=\"submit\" class=\"btn btn-default btn-lg btn-block\" [disabled]=\"!loginForm.form.valid\" >Sign in</button>\n                                      \n                                      <!--<button class=\"btn btn-primary btn-lg btn-block\"  (click)=\"makeGet()\" >Login with Facebook</button>-->\n                                      <br/>\n                                      <a routerLinkActive=\"active\" routerLink=\"/register\">Not yet member, register here</a>\n                                    </form>\n                    \n                                </div>\n                            </div>\n                        </div>\n                    </section>\n                </div>\n            </div>\n        </section>\n        \n        "
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map