import { Http, Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { User } from '../models/user';



@Injectable()
export class UsersService{

    private loginUrl = "api/users/login";
    private registerUrl = "api/users";
    private testUrl = "test";

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

    testGet(){
        return this.http.get(this.testUrl)
            .toPromise()
            .then(res => res.json(), err => err.json())
    }

    constructor(private http: Http){}
}
