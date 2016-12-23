import { Component } from '@angular/core';

@Component({
    template: `
        <div class="container" style="padding-top: 30px;">
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation"><a [routerLink]="['/profile']">Profile info</a></li>
                    <li role="presentation" ><a [routerLink]="['change-pwd']">Change password</a></li>
                    <li role="presentation"><a [routerLink]="['manage-adress']">Manage adresses</a></li>
                    <li role="presentation"><a [routerLink]="['manage-account']">Manage your accounts</a></li>
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