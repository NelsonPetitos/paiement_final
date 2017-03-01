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
var router_1 = require('@angular/router');
var AuthWRT = (function () {
    function AuthWRT(router) {
        var _this = this;
        this.router = router;
        this.redirectUrl = '/home';
        this.logoutRediredtURl = '/home';
        // this.lock.initConfig();
        this.lock = new WRTLock();
        this.lock.loginCallback = function (profile) {
            if (profile) {
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.router.navigate([_this.redirectUrl]);
                _this.redirectUrl = _this.logoutRediredtURl;
                console.log("profile define in the and redirenction done to " + _this.redirectUrl);
            }
        };
    }
    AuthWRT.prototype.login = function () {
        console.log('Je dois afficher le login');
        this.lock.show();
    };
    AuthWRT.prototype.authenticated = function () {
        return (localStorage.getItem("profile") !== null);
    };
    AuthWRT.prototype.logout = function () {
        localStorage.removeItem('profile');
        this.router.navigate([this.logoutRediredtURl]);
    };
    AuthWRT.prototype.setRedirectUrl = function (url) {
        console.log("redirect url set to " + url);
        this.redirectUrl = url;
    };
    AuthWRT = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AuthWRT);
    return AuthWRT;
}());
exports.AuthWRT = AuthWRT;
//# sourceMappingURL=my-auth.service.js.map