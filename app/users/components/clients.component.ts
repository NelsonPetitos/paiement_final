import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Auth } from '../../services/auth.service';

@Component({
    template: `<h1>Clients list</h1>
    
        <circle-loader *ngIf="showLoader" role="alert"></circle-loader>

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
export class ClientsComponent {
    transactions: any[] = [];
    profile: any;
    showLoader = true;

    constructor(private usersService: UsersService, private auth: Auth){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        let options = {apikey: this.profile.apikey, status: 'sucess'}
        this.usersService.getClients(options).then(
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