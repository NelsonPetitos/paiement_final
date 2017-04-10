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
            <tr *ngFor="let client of clients; let cptr = index">
                <td>{{cptr}}</td>
                <td>{{client.phone}}</td>
            </tr>
            <tr *ngIf="clients.length == 0">
                <td colspan="3"><h2 style="text-align: center;">No clients.</h2></td>
            </tr>
        </table>
    </div>
    `
})
export class ClientsComponent implements OnInit{
    private showLoader = true;
    private profile : any;
    private clients: any[] = [];

    constructor(private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
        if(this.profile.apikey){
            this.usersService.getClients(this.profile.apikey).then(
                (data) => {
                    console.log('Get clients');
                    console.log(data);
                    this.showLoader = false;
                    this.clients = data.data;
                },
                (err) => {
                    this.showLoader = false;
                    console.log('Error when getting clients');
                    console.log(err);
                }
            );
        }
    }
}