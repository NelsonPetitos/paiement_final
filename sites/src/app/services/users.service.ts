import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
    private clientUrl = "api/get-client";

    constructor(private http: Http){
    }

    getClients(privatekey: string){
        return this.http.get(this.clientUrl+"/"+privatekey)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }
}