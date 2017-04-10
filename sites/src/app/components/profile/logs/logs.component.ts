import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
    template: `
        <h1>Transactions logs</h1>
        
        <div style="margin-top: 34px;"><circle-loader *ngIf="showLoader" role="alert"></circle-loader></div>

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
    private profile: any;
    private showLoader = true;

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
    }
}