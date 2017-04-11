import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
    template: `
        <h1>List payments</h1>
        
        <div style="margin-top: 34px;"><circle-loader *ngIf="showLoader" role="alert"></circle-loader></div>

        <div *ngIf="!showLoader" class="table-responsive">
            <table class="table table-hover">
                <tr>
                    <td>Send on</td>
                    <td>Number</td>
                    <td>Amount</td>
                    <td>Payment token</td>
                <tr>
                <tr *ngFor="let transaction of transactions">
                    <td>{{transaction.date_init}}</td>
                    <td>{{transaction.phone}}</td>
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.token_id}}</td>
                </tr>
                <tr *ngIf="transactions.length == 0">
                    <td colspan="5"><h2 style="text-align: center;">No payments made.</h2></td>
                </tr>
            </table>
        </div>
    `
})
export class PaymentsComponent implements OnInit{
    private profile: any;
    private showLoader = true;
    private transactions: any[] = [];
    private options = {day: "numeric", month: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric'};

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if(this.profile.apikey){
            this.usersService.getPayments(this.profile.apikey).then(
                (data) => {
                    this.showLoader = false;
                    this.transactions = data.data;
                    this.transactions.forEach(transaction => {
                        if(transaction.date_init){
                            transaction.date_init = new Date(transaction.date_init)
                            transaction.date_init = transaction.date_init.toLocaleString('en-GB', this.options);
                        }
                    });
                },
                (err) => {
                    this.showLoader = false;
                    console.log(err);
                }
            );
        }
    }
}