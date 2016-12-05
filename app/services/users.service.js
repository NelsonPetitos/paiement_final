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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.loginUrl = "api/users/login";
        this.registerUrl = "api/users";
        this.testUrl = "test";
    }
    UsersService.prototype.loginUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, user, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.registerUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.registerUrl, user, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.testGet = function () {
        return this.http.get(this.testUrl)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map