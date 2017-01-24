import { Component } from '@angular/core';

@Component({
    template: `
        <div class="container" style="padding-top: 30px;">
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation"><a [routerLink]="['/profile']"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;&nbsp;Profile info</a></li>
                    <li role="presentation"><a [routerLink]="['logs']"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;&nbsp;Logs</a></li>
                    <li role="presentation"><a [routerLink]="['payments']"><span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;&nbsp;Payments</a></li>
                    <li role="presentation"><a [routerLink]="['clients']"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;Clients</a></li>
                    <li role="presentation" ><a [routerLink]="['change-pwd']"><span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;&nbsp;Change password</a></li>
                    <li role="presentation"><a [routerLink]="['manage-adress']"><span class="glyphicon glyphicon-level-up"></span>&nbsp;&nbsp;&nbsp;Manage adresses</a></li>
                    <li role="presentation"><a [routerLink]="['manage-account']"><span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;&nbsp;Manage accounts</a></li>
                    <li role="presentation"><a [routerLink]="['manage-cashiers']"><span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;&nbsp;Manage cashiers</a></li>
                </ul>
            </div>
            <div class="col-md-8" style="text-align:center;">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class ProfileComponent {
    
}