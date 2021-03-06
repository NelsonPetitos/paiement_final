import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
    private clientUrl = "api/get-client";
    private logsUrl = "api/get-logs";
    private logsPaginationUrl = "api/get-logs-pagination";
    private paymentsUrl = "api/get-payments";
    private paymentsPaginationUrl = "api/get-payments-pagination";

    constructor(private http: Http){
    }

    getClients(apikey: string, limit = 10, page = 1){
        return this.http.get(this.clientUrl+"?apikey="+apikey+"&limit="+limit+"&page="+page)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    getLogs(apikey: string, limit = 10, page = 1){
        return this.http.get(this.logsUrl+"?apikey="+apikey+"&limit="+limit+"&page="+page)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    getLogsPagination(apikey: string){
        return this.http.get(this.logsPaginationUrl+"?apikey="+apikey)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    getPayments(apikey: string, limit = 10, page = 1){
        return this.http.get(this.paymentsUrl+"?apikey="+apikey+"&limit="+limit+"&page="+page)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }

    getPaymentsPagination(apikey: string){
        return this.http.get(this.paymentsPaginationUrl+"?apikey="+apikey)
            .toPromise()
            .then(
                res => res.json(), 
                err => err.json()
            )
    }
}