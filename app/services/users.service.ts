import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable()
export class UsersService{

    private loginUrl = "api/users/login";
    private registerUrl = "api/users";

    loginUser(user: User){
        console.log(`Login user ${user.email}`)
    }

    registerUser(user: User){
        console.log(user)
        let headers = new Headers()
        headers.append('Content-Type', 'application/x-www-form-urlencoded')
        return
            this.http.post(this.registerUrl, JSON.stringify(user), {headers: headers})
                .map(res => res.json());
    }

    constructor(private http: Http){}
}
