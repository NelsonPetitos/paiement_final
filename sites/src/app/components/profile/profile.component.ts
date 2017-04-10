import { Component } from '@angular/core';

@Component({
    template: `
    <div class="container" style="padding-top: 30px;">
        <div class="row">
            <div class="col-xs-12">
                <ol class="breadcrumb">
                    <li><a [routerLink]="['/profile']" (click)="setSelectedLink('')">Profile</a></li>
                    <li *ngIf="selectedLink!==''" class="active">{{selectedLink}}</li>
                </ol>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <ul class="nav nav-pills nav-stacked">
                    <li role="presentation"><a (click)="setSelectedLink('Edit')"><span class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;&nbsp;Edit profile</a></li>
                    <li role="presentation"><a [routerLink]="['/profile/logs']" (click)="setSelectedLink('Logs')"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;&nbsp;Logs</a></li>
                    <li role="presentation"><a [routerLink]="['/profile/payments']" (click)="setSelectedLink('Payments')"><span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;&nbsp;&nbsp;Payments</a></li>
                    <li role="presentation"><a [routerLink]="['/profile/clients']" (click)="setSelectedLink('Clients')"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;Clients</a></li>
                    <li role="presentation"><a (click)="setSelectedLink('Accounts')"><span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;&nbsp;Manage accounts</a></li>
                    <li role="presentation"><a (click)="setSelectedLink('Cashiers')"><span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;&nbsp;Manage cashiers</a></li>
                </ul>
            </div>
            <div class="col-md-8" style="text-align:center;">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>`
})
export class ProfileComponent {
    selectedLink = ''

    setSelectedLink(link: string){
        this.selectedLink = link;
    }
}