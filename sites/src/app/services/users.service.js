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
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        this.clientUrl = "api/get-client";
        this.logsUrl = "api/get-logs";
        this.paymentsUrl = "api/get-payments";
    }
    UsersService.prototype.getClients = function (apikey, limit, page) {
        if (limit === void 0) { limit = 10; }
        if (page === void 0) { page = 1; }
        return this.http.get(this.clientUrl + "?apikey=" + apikey + "&limit=" + limit + "&page=" + page)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.getLogs = function (apikey, limit, page) {
        if (limit === void 0) { limit = 10; }
        if (page === void 0) { page = 1; }
        return this.http.get(this.logsUrl + "?apikey=" + apikey + "&limit=" + limit + "&page=" + page)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.getPayments = function (apikey, limit, page) {
        if (limit === void 0) { limit = 10; }
        if (page === void 0) { page = 1; }
        return this.http.get(this.paymentsUrl + "?apikey=" + apikey + "&limit=" + limit + "&page=" + page)
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