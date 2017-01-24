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
        this.usersUrl = "api/users";
        this.accountUrl = "api/account";
        this.adressUrl = "api/adress";
        this.changepwdUrl = 'api/users/change-pwd';
        this.transactionsUrl = 'api/transactions';
        this.clientUrl = "api/transactions/clients";
        this.cashierUrl = "api/cashier";
    }
    /*--------------Working on users-------------*/
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
    UsersService.prototype.getUser = function (id) {
        return this.http.get(this.usersUrl + "/" + id)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.changePassword = function (data) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.changepwdUrl, data, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    /*--------------Working on Adresses-------------*/
    UsersService.prototype.getAdresses = function (userId) {
        return this.http.get(this.adressUrl + "/" + userId)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.saveAdress = function (adress) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.adressUrl, adress, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.deleteAdress = function (id) {
        return this.http.delete(this.adressUrl + "/" + id)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    /*--------------Working on accounts-------------*/
    UsersService.prototype.getAccount = function (userId) {
        return this.http.get(this.accountUrl + "/" + userId)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.saveAccount = function (account) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.accountUrl, account, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.deleteAccount = function (id) {
        return this.http.delete(this.accountUrl + "/" + id)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    /*--------------Working on transactions-------------*/
    UsersService.prototype.getTransactions = function (opt) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.transactionsUrl, opt, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.getClients = function (opt) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.clientUrl, opt, options)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    /*--------------Working on transactions-------------*/
    UsersService.prototype.getCashier = function (userId) {
        return this.http.get(this.cashierUrl + "/" + userId)
            .toPromise()
            .then(function (res) { return res.json(); }, function (err) { return err.json(); });
    };
    UsersService.prototype.saveCashier = function (cashier) {
        console.log('je suis dans le user service');
        // console.log(cashier);
        // return new Promise(function(resolve, reject){
        //     resolve({err: false, msg: 'Tout est ok', data: {}});
        // });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.cashierUrl, cashier, options)
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