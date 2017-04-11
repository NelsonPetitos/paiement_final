import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    template: `
        <div class="page-header">
            <h1>{{profile.email}}</h1>
        </div>
        <div class="row well" style="text-align: left;">
            <div class="col-xs-2">
                <span>Email :</span><br/><br/>
                <span>Public key : </span><br/><br/>
                <span>Private key :</span><br/>
            </div>
            <div class="col-xs-10">
                <span>{{profile.email}}</span><br/><br/>
                <span>{{profile.apikey}}</span><br/><br/>
                <span>{{profile.privatekey}}</span><br/>
            </div>
        </div>
    `
})
export class DetailsComponent implements OnInit{
    profile: any;
    
    constructor(){
    }
    
    ngOnInit(){
        this.profile = JSON.parse(localStorage.getItem('profile'));
        console.log(this.profile.email);
    }
}