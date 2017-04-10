import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
    template: `
        <h1>Transactions logs</h1>
        
        <div style="margin-top: 34px;"><circle-loader *ngIf="showLoader" role="alert"></circle-loader></div>

        <div *ngIf="!showLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <td>Transaction token</td>
                    <td>Send on</td>
                    <td>Number</td>
                    <td>Amount</td>
                    <td>Status finished</td>
                <tr>
                <tr *ngFor="let transaction of transactions">
                    <td>{{transaction.token_id}}</td>
                    <td>{{transaction.date_init}}</td>
                    <td>{{transaction.phone}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.status_payment}}</td>
                </tr>
                <tr *ngIf="transactions.length == 0">
                    <td colspan="5"><h2 style="text-align: center;">No trasactions initiated.</h2></td>
                </tr>
            </table>
        </div>
    `
})
export class LogsComponent implements OnInit{
    private profile: any;
    private showLoader = true;
    private transactions: any[] = [];

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
        if(this.profile.apikey){
            this.usersService.getLogs(this.profile.apikey).then(
                (data) => {
                    console.log('Get transactions log');
                    console.log(data);
                    this.showLoader = false;
                    this.transactions = data.data;
                },
                (err) => {
                    this.showLoader = false;
                    console.log(err);
                    console.log('Error while getting logs');
                }
            );
        }
    }
}