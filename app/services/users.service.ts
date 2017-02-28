import { Http, Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Account } from '../models/account';
import { Adress } from '../models/adress';
import { Cashier } from '../models/cashier';



@Injectable()
export class UsersService{

    private loginUrl = "api/users/login";
    private registerUrl = "api/users";
    private usersUrl = "api/users";
    private accountUrl = "api/account";
    private adressUrl = "api/adress";
    private changepwdUrl = 'api/users/change-pwd';
    private transactionsUrl = 'api/transactions';
    private clientUrl = "api/transactions/clients";
    private cashierUrl = "api/cashier";

    /*--------------Working on users-------------*/

    loginUser(user: User){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.loginUrl, user, options)
            .toPromise()
            .then(
                res => res.json(),
                err => err.json()
            )
    }

    registerUser(user: User){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.registerUrl, user, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    getUser(id: string){
        return this.http.get(this.usersUrl+"/"+id)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    changePassword(data: {}){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.changepwdUrl, data, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    /*--------------Working on Adresses-------------*/

    getAdresses(userId: string){
        return this.http.get(this.adressUrl+"/"+userId)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    saveAdress(adress: Adress){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.adressUrl, adress, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    deleteAdress(id: string){
        return this.http.delete(this.adressUrl+"/"+id)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    /*--------------Working on accounts-------------*/

    getAccount(userId: string){
        return this.http.get(this.accountUrl+"/"+userId)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    saveAccount(account: Account){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.accountUrl, account, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    deleteAccount(id: string){
        return this.http.delete(this.accountUrl+"/"+id)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }


    /*--------------Working on transactions-------------*/
    getTransactions(opt: {apikey: string, status: string}){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.transactionsUrl, opt, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    getClients(opt: {apikey: string, status: string}){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientUrl, opt, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }

    /*--------------Working on transactions-------------*/
    getCashier(userId: string){
        return this.http.get(this.cashierUrl+"/"+userId)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    saveCashier(cashier: Cashier){
        console.log('je suis dans le user service');
        // console.log(cashier);
        // return new Promise(function(resolve, reject){
        //     resolve({err: false, msg: 'Tout est ok', data: {}});
        // });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.cashierUrl, cashier, options)
                .toPromise()
                .then(
                    res => res.json(),
                    err => err.json()
                );
    }
    constructor(private http: Http){}
}
