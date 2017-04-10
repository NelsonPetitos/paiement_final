import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
    template: `
    <h1>Clients list</h1>
    
    <div style="margin-top: 34px;"><circle-loader *ngIf="showLoader" role="alert"></circle-loader></div>

    <div *ngIf="!showLoader" class="table-responsive">
        <table class="table table-hover">
            <tr>
                <td>Num</td>
                <td>Number</td>
            <tr>
            <tr *ngFor="let transaction of transactions">
                <td>#</td>
                <td>{{transaction}}</td>
            </tr>
            <tr *ngIf="transactions.length == 0">
                <td colspan="3"><h2 style="text-align: center;">No clients.</h2></td>
            </tr>
        </table>
    </div>
    `
})
export class ClientsComponent implements OnInit{
    private showLoader = true;
    private profile : any;
    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
    }
}