import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service';
@Component({
    template: `<h1>Transactions logs</h1>
        
        <circle-loader *ngIf="showLoader" role="alert"></circle-loader>

        <div *ngIf="!showLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <td>Num</td>
                    <td>Send on</td>
                    <td>Number</td>
                    <td>Amount</td>
                <tr>
                <tr *ngFor="let transaction of transactions">
                    <td>#</td>
                    <td>{{transaction.serverRequest.reception_time}}</td>
                    <td>{{transaction.phone_number}}</td>
                    <td>{{transaction.serverRequest.amount}}</td>
                </tr>
                <tr *ngIf="transactions.length == 0">
                    <td colspan="4"><h2 style="text-align: center;">No Logs.</h2></td>
                </tr>
            </table>
        </div>
    `
})
export class LogsComponent implements OnInit{
    transactions: any[] = [];
    profile: any;
    showLoader = true;

    constructor(private usersService: UsersService, private auth: Auth){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        let options = {apikey: this.profile.apikey, status: 'sucess'}
        this.usersService.getTransactions(options).then(
            (data) => {
                this.showLoader = false;
                if(!data.err){
                    this.transactions = data.data;
                }
            },
            (err) => {
                this.showLoader = false;
            }
        )
    }
}