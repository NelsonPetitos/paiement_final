import { Component, OnInit } from '@angular/core'
import { Auth } from '../../services/auth.service'
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
    template:`
        <div class="row" style="margin-bottom: 30px;">
            <img class="img-circle" src="{{profile.picture}}">
        </div>
        <div class="row">
            <div class="panel panel-primary">
                <div class="panel-heading">{{profile.nickname}} profile details</div>
                <div class="panel-body">
                    <table class="table table-striped">
                        <tr>
                            <td>Api key : </td>
                            <td>{{profile.apikey}}</td>
                        </tr>
                        <tr>
                            <td>Email : </td>
                            <td>{{profile.email}}</td>
                        </tr>
                        <tr>
                            <td>Created at : </td>
                            <td>{{profile.created_at}}</td>
                        </tr>
                        <tr>
                            <td>Modified at : </td>
                            <td>{{profile.updated_at}}</td>
                        </tr>
                        <tr>
                            <td>Address (es) : </td>
                            <td [routerLink]="['/manage-adress']">See manage adresses</td>
                        </tr>
                        <tr>
                            <td>Account (s) : </td>
                            <td [routerLink]="['/manage-account']">See manage accounts</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    `
})
export class ProfileDetailsComponent implements OnInit{
    
    profile: any;
    private userId = '';
    private apikey = "xxx-xxxx-xxxxx-xxx";

    constructor(private auth: Auth, private usersService: UsersService){}

    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        // console.log(this.profile);
        this.userId = this.profile.user_id.split("|")[1];
        
    }
}